import React, { useEffect, useRef, useState } from 'react';

const RUNGS = 12;
const SAMPLES = 48;
const TOP = 6;
const BOTTOM = 122;
const CENTER = 50;
const AMPLITUDE = 25;
const SEPARATION = 33;
const TURNS = 1.35;
const STUB = 8;
// Complementary base colours: A-T and G-C pairs share a hue family.
const BASES = [
  ['#22d3ee', '#a78bfa'],
  ['#a78bfa', '#22d3ee'],
  ['#f472b6', '#34d399'],
  ['#34d399', '#f472b6'],
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
// Replication fork: the upper part of the helix unzips into a "Y" while the
// lower part stays paired and keeps turning.
const FORK_REACH = 0.62;
const FORK_BLEND = 0.28;
const openingAt = (open: number, s: number) => {
  const t = clamp((open * FORK_REACH - s) / FORK_BLEND + 0.25 * open);
  return t * t * (3 - 2 * t);
};

const strandX = (phase: number, s: number, open: number, side: 1 | -1) => {
  const theta = phase + s * Math.PI * 2 * TURNS;
  const o = openingAt(open, s);
  // Opened strands splay outwards and keep a gentle wave.
  const splay = o * SEPARATION * (0.75 + 0.25 * (1 - s));
  return CENTER + side * (AMPLITUDE * Math.sin(theta) * (1 - o) + splay) + o * 2.2 * Math.sin(theta * 0.5 + side);
};

const strandPath = (phase: number, open: number, side: 1 | -1) => {
  let d = '';
  for (let i = 0; i <= SAMPLES; i += 1) {
    const s = i / SAMPLES;
    const y = TOP + s * (BOTTOM - TOP);
    d += `${i === 0 ? 'M' : 'L'}${strandX(phase, s, open, side).toFixed(2)} ${y.toFixed(2)} `;
  }
  return d;
};

// Rotating DNA double helix that unzips when `open` is true.
const DnaHelix: React.FC<{ open: boolean }> = ({ open }) => {
  const [state, setState] = useState({ phase: 0, open: 0 });
  const target = useRef(open ? 1 : 0);
  target.current = open ? 1 : 0;

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let last = performance.now();
    let phase = 0;
    let current = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (reducedMotion) {
        current = target.current;
      } else {
        current += (target.current - current) * Math.min(1, dt * 4.5);
        phase += dt * 1.25 * (1 - current * 0.45);
      }
      setState({ phase, open: current });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const { phase, open: o } = state;

  const rungs = Array.from({ length: RUNGS }, (_, index) => {
    const s = (index + 0.5) / RUNGS;
    const y = TOP + s * (BOTTOM - TOP);
    const theta = phase + s * Math.PI * 2 * TURNS;
    const depth = Math.cos(theta);
    const opening = openingAt(o, s);
    const xa = strandX(phase, s, o, 1);
    const xb = strandX(phase, s, o, -1);
    const half = Math.abs(xa - xb) / 2;
    const length = half + (STUB - half) * opening;
    const dir = xb > xa ? 1 : -1;
    const [colorA, colorB] = BASES[index % BASES.length];
    const opacity = 0.35 + 0.55 * Math.max(Math.abs(depth) * (1 - opening), opening);
    return { index, y, xa, xb, length, dir, colorA, colorB, opacity, depth, opening };
  });

  return (
    <svg className={o > 0.05 ? 'genome-helix unzipped' : 'genome-helix'} viewBox="0 0 100 128" aria-hidden="true">
      <g className="helix-base-pairs">
        {rungs.map(r => (
          <g key={r.index} opacity={r.opacity}>
            <line x1={r.xa} y1={r.y} x2={r.xa + r.dir * r.length} y2={r.y} stroke={r.colorA} />
            <line x1={r.xb} y1={r.y} x2={r.xb - r.dir * r.length} y2={r.y} stroke={r.colorB} />
            {r.opening > 0.6 && (
              <>
                <circle cx={r.xa + r.dir * r.length} cy={r.y} r={1.4} fill={r.colorA} />
                <circle cx={r.xb - r.dir * r.length} cy={r.y} r={1.4} fill={r.colorB} />
              </>
            )}
          </g>
        ))}
      </g>
      <path className="helix-backbone helix-cyan" d={strandPath(phase, o, 1)} />
      <path className="helix-backbone helix-violet" d={strandPath(phase, o, -1)} />
      <g className="helix-nodes">
        {rungs.map(r => (
          <React.Fragment key={r.index}>
            <circle className="helix-node-cyan" cx={r.xa} cy={r.y} r={1.7 + 0.7 * (r.depth + 1) / 2} />
            <circle className="helix-node-violet" cx={r.xb} cy={r.y} r={1.7 + 0.7 * (1 - r.depth) / 2} />
          </React.Fragment>
        ))}
      </g>
    </svg>
  );
};

export default DnaHelix;

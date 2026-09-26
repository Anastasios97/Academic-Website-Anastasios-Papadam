import React, { useEffect, useRef, useState } from 'react';

type Sex = 'male' | 'female';

interface Bubble {
  x: number;
  y: number;
  threshold: number;
  dx: number;
  dy: number;
}

const MIN_AGE = 30;
const MAX_AGE = 95;
const STEP = 5.6;

// Deterministic pseudo-random numbers so server and client render identically.
const seeded = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

// Illustrative logistic curves, calibrated so that about 1% of blood cells show
// the change at age 45 in males (loss of Y) and at age 55 in females (loss of X),
// with essentially none in younger people. A teaching aid, not study data.
const curves: Record<Sex, { max: number; midpoint: number; spread: number }> = {
  male: { max: 0.6, midpoint: 71.5, spread: 6.5 },
  female: { max: 0.35, midpoint: 79.7, spread: 7 },
};

const mosaicShare = (sex: Sex, age: number) => {
  const { max, midpoint, spread } = curves[sex];
  return max / (1 + Math.exp(-(age - midpoint) / spread));
};

// Builds a metaphase chromosome out of bubbles: two sister chromatids pinched
// together at the centromere.
const buildChromosome = (rows: number, centromere: number, cx: number, top: number, seed: number): Bubble[] => {
  const random = seeded(seed);
  const bubbles: Bubble[] = [];
  for (let row = 0; row < rows; row += 1) {
    const distance = Math.abs(row - centromere);
    const offset = 5.5 + 5 * Math.min(1, distance / 3.5);
    const width = distance < 0.5 || row === 0 || row === rows - 1 ? 2 : 3;
    for (const side of [-1, 1]) {
      for (let col = 0; col < width; col += 1) {
        bubbles.push({
          x: cx + side * offset + (col - (width - 1) / 2) * STEP,
          y: top + row * STEP,
          threshold: random(),
          dx: (random() - 0.5) * 14,
          dy: (random() - 0.5) * 14,
        });
      }
    }
  }
  return bubbles;
};

const karyotypes: Record<Sex, { label: string; affected: string; code: string; chromosomes: Array<{ name: string; bubbles: Bubble[]; affected: boolean; labelY: number; cx: number }> }> = {
  male: {
    label: 'Male · XY',
    affected: 'loss of chromosome Y',
    code: 'mLOY',
    chromosomes: [
      { name: 'X', bubbles: buildChromosome(22, 8, 62, 12, 11), affected: false, labelY: 146, cx: 62 },
      { name: 'Y', bubbles: buildChromosome(11, 3, 142, 62, 29), affected: true, labelY: 146, cx: 142 },
    ],
  },
  female: {
    label: 'Female · XX',
    affected: 'loss of one X chromosome',
    code: 'mLOX',
    chromosomes: [
      { name: 'X', bubbles: buildChromosome(22, 8, 62, 12, 11), affected: false, labelY: 146, cx: 62 },
      { name: 'X', bubbles: buildChromosome(22, 8, 142, 12, 47), affected: true, labelY: 146, cx: 142 },
    ],
  },
};

const stageFor = (share: number) => {
  if (share < 0.01) return 'No detectable mosaicism';
  if (share < 0.05) return 'Clones emerging';
  if (share < 0.2) return 'Clonal expansion';
  return 'Pronounced mosaicism';
};

const MosaicExplorer: React.FC<{ onLearnMore: () => void }> = ({ onLearnMore }) => {
  const [sex, setSex] = useState<Sex>('male');
  const [age, setAge] = useState(MIN_AGE);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Autoplay: age advances by itself, pauses at the end, then restarts.
  useEffect(() => {
    if (!playing || !visible) return;
    const delay = age >= MAX_AGE ? 2200 : age === MIN_AGE ? 900 : 150;
    const timer = window.setTimeout(() => setAge(current => (current >= MAX_AGE ? MIN_AGE : current + 1)), delay);
    return () => window.clearTimeout(timer);
  }, [age, playing, visible]);

  const share = mosaicShare(sex, age);
  const percentValue = share * 100;
  const percent = percentValue < 10 ? percentValue.toFixed(1) : Math.round(percentValue).toString();
  const karyotype = karyotypes[sex];
  const onsetAge = sex === 'male' ? 45 : 55;

  const switchSex = (next: Sex) => {
    setSex(next);
    setAge(MIN_AGE);
  };

  return (
    <div className="mosaic-explorer glass-panel" ref={rootRef}>
      <div className="mosaic-copy">
        <span className="package-coming-label">Interactive explainer</span>
        <h3>Watch mosaicism emerge with age.</h3>
        <p>
          Every cell should carry the same chromosomes, but with age some blood cells
          lose a sex chromosome and expand into clones: loss of Y in men, loss of an X
          in women. My research asks whether this hidden mosaic signal helps explain who
          develops age-related macular degeneration, and how fast it progresses.
        </p>

        <div className="mosaic-toggle" role="group" aria-label="Choose chromosome set">
          {(['male', 'female'] as Sex[]).map(option => (
            <button
              key={option}
              type="button"
              className={sex === option ? 'active' : undefined}
              aria-pressed={sex === option}
              onClick={() => switchSex(option)}
            >
              <strong>{option === 'male' ? 'XY' : 'XX'}</strong>
              {option === 'male' ? 'Male' : 'Female'}
            </button>
          ))}
        </div>

        <div className="mosaic-slider">
          <div className="mosaic-slider-head">
            <span>Age <strong>{age}</strong></span>
            <button
              type="button"
              className="mosaic-play"
              onClick={() => setPlaying(value => !value)}
              aria-label={playing ? 'Pause the age animation' : 'Play the age animation'}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14l12-7z" /></svg>
              )}
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
          <input
            type="range"
            min={MIN_AGE}
            max={MAX_AGE}
            value={age}
            onChange={event => {
              setPlaying(false);
              setAge(Number(event.target.value));
            }}
            aria-label="Age in years"
            aria-valuetext={`${age} years, about ${percent}% of blood cells with ${karyotype.code}`}
            style={{ '--fill': `${((age - MIN_AGE) / (MAX_AGE - MIN_AGE)) * 100}%`, '--onset': `${((onsetAge - MIN_AGE) / (MAX_AGE - MIN_AGE)) * 100}%` } as React.CSSProperties}
          />
          <small>
            <span>{MIN_AGE}</span>
            <span className="mosaic-onset" style={{ left: `${((onsetAge - MIN_AGE) / (MAX_AGE - MIN_AGE)) * 100}%` }}>~1% at {onsetAge}</span>
            <span>{MAX_AGE}</span>
          </small>
        </div>

        <div className="mosaic-readout">
          <div>
            <strong>{percent}%</strong>
            <span>blood cells with {karyotype.code}</span>
          </div>
          <div>
            <strong className="mosaic-stage">{stageFor(share)}</strong>
            <span>clonal landscape</span>
          </div>
        </div>

        <button type="button" className="secondary-button" onClick={onLearnMore}>
          Read the research behind it <span aria-hidden="true">&rarr;</span>
        </button>
        <p className="mosaic-disclaimer">Illustrative model for explanation only. Not derived from study data.</p>
      </div>

      <div className="mosaic-visual">
        <svg className="karyotype" viewBox="0 0 204 156" role="img" aria-label={`${karyotype.label} chromosomes. About ${percent}% of cells show ${karyotype.affected}.`}>
          {karyotype.chromosomes.map((chromosome, chromosomeIndex) => (
            <g key={`${sex}-${chromosomeIndex}`} className={chromosome.affected ? 'chromosome affected' : 'chromosome'}>
              {chromosome.bubbles.map((bubble, index) => {
                const lost = chromosome.affected && bubble.threshold < share;
                return (
                  <circle
                    key={index}
                    cx={bubble.x}
                    cy={bubble.y}
                    r={2.45}
                    className={lost ? 'bubble lost' : 'bubble'}
                    style={{
                      '--dx': `${bubble.dx}px`,
                      '--dy': `${bubble.dy}px`,
                      animationDelay: `${(index % 9) * -0.35}s`,
                    } as React.CSSProperties}
                  />
                );
              })}
              <text x={chromosome.cx} y={chromosome.labelY} textAnchor="middle" className="chromosome-label">
                {chromosome.name}
              </text>
            </g>
          ))}
        </svg>
        <div className="mosaic-legend">
          <span><i className="normal" /> Present in all cells</span>
          <span><i className="altered" /> Lost in a share of cells</span>
        </div>
        <p className="mosaic-caption">
          Faded bubbles on the {sex === 'male' ? 'Y' : 'second X'} chromosome show the approximate share of blood cells that have lost it.
        </p>
      </div>
    </div>
  );
};

export default MosaicExplorer;

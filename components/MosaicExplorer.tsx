import React, { useMemo, useState } from 'react';

const GRID = 18;
const CELLS = GRID * GRID;

// Deterministic pseudo-random numbers so server and client render identically.
const seeded = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

// Illustrative curve only: the share of cells carrying a mosaic change rises
// steeply in later life. It is a teaching aid, not an estimate from real data.
const mosaicShare = (age: number) => 0.55 / (1 + Math.exp(-(age - 74) / 6.5)) + 0.01;

const MosaicExplorer: React.FC<{ onLearnMore: () => void }> = ({ onLearnMore }) => {
  const [age, setAge] = useState(45);

  const thresholds = useMemo(() => {
    const random = seeded(20250101);
    // Neighbouring cells share clones: blend a cluster value with noise so mosaic
    // cells appear in patches, like expanding clones, rather than as pure noise.
    const clusters = Array.from({ length: 36 }, () => random());
    return Array.from({ length: CELLS }, (_, index) => {
      const row = Math.floor(index / GRID);
      const col = index % GRID;
      const cluster = clusters[Math.floor(row / 3) * 6 + Math.floor(col / 3)];
      return cluster * 0.65 + random() * 0.35;
    });
  }, []);

  const share = mosaicShare(age);
  const cutoff = useMemo(() => {
    const sorted = [...thresholds].sort((a, b) => a - b);
    return sorted[Math.min(CELLS - 1, Math.floor(share * CELLS))];
  }, [share, thresholds]);

  const mosaicCount = thresholds.filter(value => value < cutoff).length;
  const percent = Math.round((mosaicCount / CELLS) * 100);

  const stage = age < 55 ? 'Mostly uniform' : age < 70 ? 'Clones emerging' : age < 80 ? 'Clonal expansion' : 'Pronounced mosaicism';

  return (
    <div className="mosaic-explorer glass-panel">
      <div className="mosaic-copy">
        <span className="package-coming-label">Interactive explainer</span>
        <h3>Watch mosaicism emerge with age.</h3>
        <p>
          Every cell should carry the same genome, but as we age some blood cells
          acquire chromosomal changes, such as loss of the Y chromosome, and expand
          into clones. My research asks whether this hidden mosaic signal helps explain
          who develops age-related macular degeneration, and how fast it progresses.
        </p>

        <label className="mosaic-slider">
          <span>
            Age <strong>{age}</strong>
          </span>
          <input
            type="range"
            min={30}
            max={95}
            value={age}
            onChange={event => setAge(Number(event.target.value))}
            aria-valuetext={`${age} years, ${percent}% of illustrated cells mosaic`}
            style={{ '--fill': `${((age - 30) / 65) * 100}%` } as React.CSSProperties}
          />
          <small><span>30</span><span>95</span></small>
        </label>

        <div className="mosaic-readout">
          <div>
            <strong>{percent}%</strong>
            <span>cells with a mosaic change</span>
          </div>
          <div>
            <strong className="mosaic-stage">{stage}</strong>
            <span>clonal landscape</span>
          </div>
        </div>

        <button type="button" className="secondary-button" onClick={onLearnMore}>
          Read the research behind it <span aria-hidden="true">&rarr;</span>
        </button>
        <p className="mosaic-disclaimer">Illustrative model for explanation only. Not derived from study data.</p>
      </div>

      <div className="mosaic-grid-wrap" aria-hidden="true">
        <div className="mosaic-grid" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
          {thresholds.map((value, index) => (
            <span
              key={index}
              className={value < cutoff ? 'mosaic-cell altered' : 'mosaic-cell'}
              style={{ transitionDelay: `${(index % GRID) * 8}ms` }}
            />
          ))}
        </div>
        <div className="mosaic-legend">
          <span><i className="normal" /> Typical cell</span>
          <span><i className="altered" /> Mosaic clone</span>
        </div>
      </div>
    </div>
  );
};

export default MosaicExplorer;

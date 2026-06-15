import React, { useState } from 'react';

const methods = [
  {
    id: 'gwas',
    short: 'GWAS',
    name: 'Genome-wide association studies',
    description: 'Scan the genome to identify variants associated with diseases and quantitative traits.',
    output: 'Variant-trait signals',
  },
  {
    id: 'prs',
    short: 'GRS',
    name: 'Genetic risk scores',
    description: 'Combine effects across many variants to estimate inherited susceptibility and stratify risk.',
    output: 'Risk prediction',
  },
  {
    id: 'mr',
    short: 'MR',
    name: 'Mendelian randomization',
    description: 'Use genetic instruments to test whether an exposure may causally influence an outcome.',
    output: 'Causal evidence',
  },
  {
    id: 'eqtl',
    short: 'eQTL',
    name: 'Expression quantitative trait loci',
    description: 'Connect genetic variants with changes in gene expression across tissues and cell types.',
    output: 'Gene regulation',
  },
  {
    id: 'coloc',
    short: 'COLOC',
    name: 'Colocalization',
    description: 'Test whether two traits, such as disease risk and gene expression, share a causal signal.',
    output: 'Shared mechanisms',
  },
  {
    id: 'fine-map',
    short: 'FINE',
    name: 'Statistical fine-mapping',
    description: 'Narrow associated regions to credible sets of variants most likely to drive the signal.',
    output: 'Candidate variants',
  },
];

const GenomeSystemsVisual: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState(methods[0]);

  return (
    <div className="genome-story" aria-label="How genetics shapes health and how genetic evidence is studied">
      <section className="phenotype-stage">
        <header className="visual-stage-header">
          <span>01</span>
          <div>
            <strong>Genome to phenotype</strong>
            <small>How inherited and acquired variation shapes biology</small>
          </div>
        </header>

        <div className="phenotype-map">
          <div className="phenotype-glow" />
          <svg className="phenotype-network" viewBox="0 0 520 520" aria-hidden="true">
            <defs>
              <linearGradient id="phenotype-signal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <circle className="phenotype-ring ring-one" cx="260" cy="260" r="168" />
            <circle className="phenotype-ring ring-two" cx="260" cy="260" r="112" />
            <path id="impact-disease" className="phenotype-path" d="M260 260 C206 218 158 164 103 130" />
            <path id="impact-ageing" className="phenotype-path" d="M260 260 C310 207 358 155 420 124" />
            <path id="impact-molecular" className="phenotype-path" d="M260 260 C262 194 260 133 260 70" />
            <path id="impact-retina" className="phenotype-path" d="M260 260 C202 310 153 363 96 397" />
            <path id="impact-treatment" className="phenotype-path" d="M260 260 C318 307 366 355 426 394" />

            <circle className="travelling-signal signal-one" r="4">
              <animateMotion dur="4.2s" repeatCount="indefinite">
                <mpath href="#impact-disease" />
              </animateMotion>
            </circle>
            <circle className="travelling-signal signal-two" r="4">
              <animateMotion dur="4.8s" begin="-1.2s" repeatCount="indefinite">
                <mpath href="#impact-ageing" />
              </animateMotion>
            </circle>
            <circle className="travelling-signal signal-three" r="4">
              <animateMotion dur="4s" begin="-2s" repeatCount="indefinite">
                <mpath href="#impact-molecular" />
              </animateMotion>
            </circle>
            <circle className="travelling-signal signal-four" r="4">
              <animateMotion dur="5s" begin="-3s" repeatCount="indefinite">
                <mpath href="#impact-retina" />
              </animateMotion>
            </circle>
            <circle className="travelling-signal signal-five" r="4">
              <animateMotion dur="4.6s" begin="-0.7s" repeatCount="indefinite">
                <mpath href="#impact-treatment" />
              </animateMotion>
            </circle>
          </svg>

          <div className="genome-nucleus">
            <svg className="genome-helix" viewBox="0 0 90 110" aria-hidden="true">
              <path className="helix-line helix-cyan" d="M25 5 C80 20 10 38 65 54 C120 70 35 88 65 105" />
              <path className="helix-line helix-violet" d="M65 5 C10 20 80 38 25 54 C-30 70 55 88 25 105" />
              <path className="helix-rungs" d="M31 14 L59 14 M24 31 L66 31 M27 51 L63 51 M25 72 L65 72 M30 94 L60 94" />
            </svg>
            <strong>GENOME</strong>
            <span>variation</span>
          </div>

          <article className="impact-node impact-molecular">
            <i />
            <strong>Molecular traits</strong>
            <small>expression + proteins</small>
          </article>
          <article className="impact-node impact-disease">
            <i />
            <strong>Disease risk</strong>
            <small>AMD + complex disease</small>
          </article>
          <article className="impact-node impact-ageing">
            <i />
            <strong>Biological ageing</strong>
            <small>cells, tissues + organs</small>
          </article>
          <article className="impact-node impact-retina">
            <i />
            <strong>Retinal health</strong>
            <small>onset + progression</small>
          </article>
          <article className="impact-node impact-treatment">
            <i />
            <strong>Treatment response</strong>
            <small>efficacy + adverse effects</small>
          </article>
        </div>
      </section>

      <div className="evidence-bridge" aria-hidden="true">
        <span />
        <strong>study the signal</strong>
        <span />
      </div>

      <section className="methods-stage">
        <header className="visual-stage-header">
          <span>02</span>
          <div>
            <strong>Genetic evidence engine</strong>
            <small>Methods that turn association into understanding</small>
          </div>
        </header>

        <div className="methods-grid" role="group" aria-label="Genetic epidemiology methods">
          {methods.map((method, index) => (
            <button
              key={method.id}
              type="button"
              className={activeMethod.id === method.id ? 'method-node active' : 'method-node'}
              style={{ '--method-index': index } as React.CSSProperties}
              onClick={() => setActiveMethod(method)}
              aria-pressed={activeMethod.id === method.id}
            >
              <span>{method.short}</span>
              <small>{method.name}</small>
            </button>
          ))}
        </div>

        <div className="method-explainer" aria-live="polite">
          <div className="method-explainer-signal">
            <span>{activeMethod.short}</span>
          </div>
          <div>
            <strong>{activeMethod.name}</strong>
            <p>{activeMethod.description}</p>
          </div>
          <div className="method-output">
            <small>Produces</small>
            <span>{activeMethod.output}</span>
          </div>
        </div>

        <div className="research-outcomes">
          <span>Mechanisms</span>
          <span>Prediction</span>
          <span>Biomarkers</span>
          <span>Therapeutic targets</span>
        </div>
      </section>
    </div>
  );
};

export default GenomeSystemsVisual;

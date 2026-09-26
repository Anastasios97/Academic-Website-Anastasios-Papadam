import React, { useState } from 'react';
import DnaHelix from './DnaHelix';

const impacts = [
  { id: 'molecular', title: 'Molecular traits', subtitle: 'expression + proteins', short: 'EXPRESSION', detail: 'Variants alter gene expression and protein levels: the first step from DNA to function.' },
  { id: 'disease', title: 'Disease risk', subtitle: 'AMD + complex disease', short: 'RISK', detail: 'Inherited and somatic variation shift susceptibility to AMD and other complex diseases.' },
  { id: 'ageing', title: 'Biological ageing', subtitle: 'cells, tissues + organs', short: 'AGEING', detail: 'Acquired mutations and mosaicism accumulate with age across cells, tissues and organs.' },
  { id: 'retina', title: 'Retinal health', subtitle: 'onset + progression', short: 'RETINA', detail: 'Genetic signals influence when retinal disease begins and how quickly it progresses.' },
  { id: 'treatment', title: 'Treatment response', subtitle: 'efficacy + adverse effects', short: 'RESPONSE', detail: 'Genetic profiles help explain why patients respond differently to the same therapy.' },
];

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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const activeImpact = impacts.find(impact => impact.id === activeId) ?? null;

  return (
    <div className="genome-story" aria-label="How genetics shapes health and how genetic evidence is studied">
      <section className="phenotype-stage">
        <header className="visual-stage-header">
          <span>01</span>
          <div>
            <strong>Genome to phenotype</strong>
            <small aria-live="polite">{activeImpact ? activeImpact.detail : 'Hover or tap an outcome to unzip the genome'}</small>
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
            <path id="impact-disease" className={activeImpact?.id === 'disease' ? 'phenotype-path active' : 'phenotype-path'} d="M260 260 C206 218 158 164 103 130" />
            <path id="impact-ageing" className={activeImpact?.id === 'ageing' ? 'phenotype-path active' : 'phenotype-path'} d="M260 260 C310 207 358 155 420 124" />
            <path id="impact-molecular" className={activeImpact?.id === 'molecular' ? 'phenotype-path active' : 'phenotype-path'} d="M260 260 C262 194 260 133 260 70" />
            <path id="impact-retina" className={activeImpact?.id === 'retina' ? 'phenotype-path active' : 'phenotype-path'} d="M260 260 C202 310 153 363 96 397" />
            <path id="impact-treatment" className={activeImpact?.id === 'treatment' ? 'phenotype-path active' : 'phenotype-path'} d="M260 260 C318 307 366 355 426 394" />

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

          <div className={activeImpact ? 'genome-nucleus open' : 'genome-nucleus'}>
            <DnaHelix open={!!activeImpact} />
            <strong>{activeImpact ? activeImpact.short : 'GENOME'}</strong>
          </div>

          {impacts.map(impact => (
            <button
              key={impact.id}
              type="button"
              className={activeImpact?.id === impact.id ? `impact-node impact-${impact.id} active` : `impact-node impact-${impact.id}`}
              onMouseEnter={() => setActiveId(impact.id)}
              onMouseLeave={() => setActiveId(pinnedId)}
              onFocus={() => setActiveId(impact.id)}
              onBlur={() => setActiveId(pinnedId)}
              onClick={() => {
                const next = pinnedId === impact.id ? null : impact.id;
                setPinnedId(next);
                setActiveId(next);
              }}
              aria-pressed={pinnedId === impact.id}
            >
              <i />
              <strong>{impact.title}</strong>
              <small>{impact.subtitle}</small>
            </button>
          ))}
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

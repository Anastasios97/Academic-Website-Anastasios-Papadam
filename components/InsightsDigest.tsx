import React, { useMemo, useState } from 'react';
import digestData from '../data/insights.json';

type InsightTopic = 'Genetics & Genomics' | 'Retinal Health' | 'Ageing Biology';

interface InsightArticle {
  id: string;
  topic: InsightTopic;
  title: string;
  summary: string;
  authors: string;
  journal: string;
  published: string;
  doi?: string;
  url: string;
  isOpenAccess: boolean;
}

interface InsightDigest {
  generatedAt: string;
  periodLabel: string;
  source: {
    name: string;
    url: string;
    description: string;
  };
  articles: InsightArticle[];
}

const digest = digestData as InsightDigest;
const topics: Array<'All' | InsightTopic> = [
  'All',
  'Genetics & Genomics',
  'Retinal Health',
  'Ageing Biology',
];

const formatDate = (date: string) => {
  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
};

const InsightsDigest: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<(typeof topics)[number]>('All');

  const articles = useMemo(
    () => activeTopic === 'All'
      ? digest.articles
      : digest.articles.filter(article => article.topic === activeTopic),
    [activeTopic],
  );

  return (
    <div className="insights-digest">
      <header className="insights-intro">
        <div>
          <span className="insights-cycle">Monthly research digest / {digest.periodLabel}</span>
          <h3>New signals across genetics, genomics, ageing, and retinal health.</h3>
          <p>
            A focused selection of recently published research, refreshed automatically
            each month and linked directly to the original scientific record.
          </p>
        </div>
        <div className="insights-meta">
          <strong>{digest.articles.length}</strong>
          <span>papers selected</span>
          <small>Updated {formatDate(digest.generatedAt.slice(0, 10))}</small>
        </div>
      </header>

      <div className="insights-filters" role="group" aria-label="Filter insights by topic">
        {topics.map(topic => (
          <button
            key={topic}
            type="button"
            className={activeTopic === topic ? 'insight-filter active' : 'insight-filter'}
            onClick={() => setActiveTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="insights-list">
        {articles.map(article => (
          <article key={article.id} className="insight-article">
            <div className="insight-article-topline">
              <span className="insight-topic">{article.topic}</span>
              <span>{formatDate(article.published)}</span>
              {article.isOpenAccess && <span className="open-access">Open access</span>}
            </div>
            <h4>{article.title}</h4>
            <p>{article.summary}</p>
            <div className="insight-citation">
              <span>{article.authors}</span>
              <span>{article.journal}</span>
            </div>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read the original paper <span aria-hidden="true">{'\u2197'}</span>
            </a>
          </article>
        ))}

        {articles.length === 0 && (
          <div className="insights-empty">
            <strong>The next digest is being prepared.</strong>
            <p>Fresh papers will appear here after the monthly literature update.</p>
          </div>
        )}
      </div>

      <footer className="insights-source">
        <p>
          Discovery source: <a href={digest.source.url} target="_blank" rel="noopener noreferrer">{digest.source.name}</a>.
          Automated selection supports discovery and does not replace critical appraisal.
        </p>
      </footer>
    </div>
  );
};

export default InsightsDigest;

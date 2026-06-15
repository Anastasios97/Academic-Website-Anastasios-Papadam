import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const API_URL = 'https://www.ebi.ac.uk/europepmc/webservices/rest/search';
const ARTICLES_PER_TOPIC = 4;
const LOOKBACK_MONTHS = 4;

const topicQueries = [
  {
    topic: 'Genetics & Genomics',
    query: '(TITLE:"genetic epidemiology" OR TITLE:"genome-wide association" OR TITLE:"polygenic risk" OR TITLE:genomic OR TITLE:"genetic architecture" OR TITLE:"genetic susceptibility" OR TITLE:"Mendelian randomization") AND (TITLE_ABS:human OR TITLE_ABS:patient OR TITLE_ABS:participants OR TITLE_ABS:cohort OR TITLE_ABS:biobank)',
    titlePattern: /(genetic|genomic|genome-wide|polygenic|mendelian)/i,
    excludedTitlePattern: /(soybean|maize|wheat|rice|arabidopsis|crop|livestock|eukaryote|prophage|bacteri|microbial|education)/i,
  },
  {
    topic: 'Retinal Health',
    query: '(TITLE_ABS:retina OR TITLE_ABS:retinal OR TITLE_ABS:"macular degeneration" OR TITLE_ABS:"geographic atrophy") AND (TITLE_ABS:genetic OR TITLE_ABS:genomic OR TITLE_ABS:gene OR TITLE_ABS:variant)',
    titlePattern: /(retin|macular|ocular|optic)/i,
  },
  {
    topic: 'Ageing Biology',
    query: '(TITLE:ageing OR TITLE:aging OR TITLE:"clonal hematopoiesis" OR TITLE:"somatic mutation" OR TITLE:"epigenetic clock" OR TITLE:senescence OR TITLE:longevity OR TITLE:progeria) AND (TITLE_ABS:genetic OR TITLE_ABS:genomic OR TITLE_ABS:epigenetic OR TITLE_ABS:mutation OR TITLE_ABS:mosaic)',
    titlePattern: /(biological ag(e)?ing|clonal hematopoiesis|somatic mutations?|epigenetic clocks?|senescence|longevity|progeria)/i,
    excludedTitlePattern: /(sunflower|soybean|maize|wheat|rice|arabidopsis|crop|plant)/i,
  },
];

const excludedTypes = new Set([
  'Editorial',
  'Review',
  'Systematic Review',
  'Meta-Analysis',
  'Comment',
  'Letter',
  'News',
  'Preprint',
]);

const currentFile = fileURLToPath(import.meta.url);
const outputPath = resolve(dirname(currentFile), '../data/insights.json');

const isoDate = date => date.toISOString().slice(0, 10);

const stripMarkup = value => (value ?? '')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;/gi, "'")
  .replace(/<[^>]*>/g, ' ')
  .replace(/&[a-z]+;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const createSummary = abstract => {
  const cleanAbstract = stripMarkup(abstract);
  if (cleanAbstract.length <= 420) return cleanAbstract;

  const shortened = cleanAbstract.slice(0, 420);
  const sentenceEnd = Math.max(
    shortened.lastIndexOf('. '),
    shortened.lastIndexOf('? '),
    shortened.lastIndexOf('! '),
  );

  return `${shortened.slice(0, sentenceEnd > 220 ? sentenceEnd + 1 : 417).trim()}...`;
};

const publicationDate = result =>
  result.firstPublicationDate
  ?? result.electronicPublicationDate
  ?? result.journalInfo?.printPublicationDate
  ?? `${result.pubYear ?? new Date().getUTCFullYear()}-01-01`;

const publicationUrl = result => {
  if (result.doi) return `https://doi.org/${result.doi}`;
  if (result.pmid) return `https://europepmc.org/article/MED/${result.pmid}`;
  return `https://europepmc.org/article/${result.source}/${result.id}`;
};

const isResearchArticle = (result, topicQuery) => {
  const publicationTypes = result.pubTypeList?.pubType ?? [];
  const excludedTitle = /\b(review|meta-analysis|editorial|case report|protocol)\b/i.test(result.title);
  const relevantTitle = topicQuery.titlePattern.test(result.title);
  const topicExcluded = topicQuery.excludedTitlePattern?.test(result.title) ?? false;
  return relevantTitle
    && !excludedTitle
    && !topicExcluded
    && !publicationTypes.some(type => excludedTypes.has(type));
};

const fetchTopic = async (topicQuery, dateRange) => {
  const { topic, query } = topicQuery;
  const searchQuery = `${query} AND HAS_ABSTRACT:Y AND FIRST_PDATE:[${dateRange.start} TO ${dateRange.end}] sort_date:y`;
  const params = new URLSearchParams({
    query: searchQuery,
    format: 'json',
    resultType: 'core',
    pageSize: '35',
  });

  const response = await fetch(`${API_URL}?${params}`, {
    headers: { 'User-Agent': 'Anastasios-Papadam-Research-Digest/1.0' },
  });

  if (!response.ok) {
    throw new Error(`Europe PMC returned ${response.status} for ${topic}`);
  }

  const data = await response.json();
  const results = data.resultList?.result ?? [];

  return results
    .filter(result => result.title && result.abstractText && isResearchArticle(result, topicQuery))
    .map(result => ({
      id: result.doi ?? `${result.source}-${result.id}`,
      topic,
      title: stripMarkup(result.title),
      summary: createSummary(result.abstractText),
      authors: stripMarkup(result.authorString) || 'Authors not listed',
      journal: result.journalInfo?.journal?.title
        ?? result.journalTitle
        ?? 'Journal not listed',
      published: publicationDate(result),
      doi: result.doi,
      url: publicationUrl(result),
      isOpenAccess: result.isOpenAccess === 'Y',
      citedByCount: Number(result.citedByCount ?? 0),
    }))
    .sort((a, b) =>
      b.published.localeCompare(a.published)
      || b.citedByCount - a.citedByCount)
    .slice(0, ARTICLES_PER_TOPIC)
    .map(({ citedByCount: _citedByCount, ...article }) => article);
};

const now = new Date();
const startDate = new Date(Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth() - LOOKBACK_MONTHS,
  1,
));
const dateRange = { start: isoDate(startDate), end: isoDate(now) };

const topicResults = await Promise.all(
  topicQueries.map(topicQuery => fetchTopic(topicQuery, dateRange)),
);

const seen = new Set();
const articles = topicResults
  .flat()
  .filter(article => {
    const key = article.doi?.toLowerCase() ?? article.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

if (articles.length < topicQueries.length) {
  throw new Error(`Only ${articles.length} suitable articles were found; refusing to replace the current digest.`);
}

const digest = {
  generatedAt: now.toISOString(),
  periodLabel: new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(now),
  source: {
    name: 'Europe PMC',
    url: 'https://europepmc.org/',
    description: 'Peer-reviewed literature indexed by Europe PMC',
  },
  articles,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(digest, null, 2)}\n`, 'utf8');

console.log(`Updated ${outputPath} with ${articles.length} articles for ${digest.periodLabel}.`);

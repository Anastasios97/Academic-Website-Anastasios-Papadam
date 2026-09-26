import type { Publication, Conference } from '../types';

export const contact = {
  email: 'a.papadam@hotmail.com',
  workEmail: 'a.papadam.21@abdn.ac.uk',
  linkedin: 'https://www.linkedin.com/in/anastasios-papadam-11b432146',
  researchGate: 'https://www.researchgate.net/profile/Anastasios-Papadam-2',
  orcid: 'https://orcid.org/0000-0002-6780-6311',
};

export const publications: Publication[] = [
  {
    title: 'Differential Organ Ageing Is Associated With Age‐Related Macular Degeneration',
    authors: 'Papadam A, Lionikas A, Grassmann F.',
    journal: 'Aging Cell',
    year: 2025,
    doi: '10.1111/acel.14473',
    role: 'First author',
    tags: ['Biological ageing', 'AMD'],
  },
  {
    title: "Tapping nature's rhythm: the role of season in mitochondrial function and genetics in the UK Biobank",
    authors: 'Papadam A, Mihov M, Koller A, Weissensteiner H, Stark K, Grassmann F.',
    journal: 'Hum Genomics',
    year: 2025,
    doi: '10.1186/s40246-025-00743-8',
    role: 'First author',
    tags: ['Mitochondria', 'UK Biobank'],
  },
  {
    title: 'Retinal polyunsaturated fatty acid supplementation reverses aging-related vision decline in mice',
    authors: 'Gao F, Tom E, Rydz C, Cho W, Kolesnikov A V., Sha Y, Papadam A, et al.',
    journal: 'Sci Transl Med',
    year: 2025,
    doi: '10.1126/scitranslmed.ads5769',
    role: 'Co-author',
    tags: ['Retina', 'Translational'],
  },
];

export const conferences: Conference[] = [
  {
    title: 'The role of somatic chromosomal abundance in risk and prognosis of age-related macular degeneration',
    authors: 'Anastasios Papadam; Bernhard Hf Weber; Emily Y Chew; Claudia Strachwitz; Felix Grassmann',
    event: 'ARVO',
    location: 'US',
    year: 2024,
  },
  {
    title: 'Exploring the Genetic Landscape of Geographic Atrophy Progression: A GWAS in 2,472 Individuals with AMD',
    authors: 'Amy Stockwell; Anastasios Papadam; Tiarnan D L Keenan; Catherine Cukras; Elvira Agron; Emily Y Chew; Bernhard Hf Weber; Brian Yaspan; Felix Grassmann',
    event: 'ARVO',
    location: 'US',
    year: 2024,
  },
  {
    title: 'The role of somatic chromosomal abundance in risk and prognosis of age-related macular degeneration',
    authors: 'Anastasios Papadam; Bernhard Hf Weber; Emily Y Chew; Claudia Strachwitz; Felix Grassmann',
    event: 'ProRetina',
    location: 'Germany',
    year: 2023,
  },
];

export const education = [
  {
    degree: 'PhD, Genetic Epidemiology',
    institution: 'University of Aberdeen, Scotland, UK',
    detail: 'Thesis research on the influence of somatic chromosomal mosaicism in age-related macular degeneration. Funded by Fight for Sight.',
  },
  {
    degree: 'M.Sci. Genetics (Immunology & Biobusiness)',
    institution: 'University of Aberdeen, Scotland, UK',
    detail: "Five-year integrated Master's, including an industrial placement year at BSRC \"Alexander Fleming\", Greece.",
  },
];

export const toolkit = [
  {
    area: 'Statistical genetics',
    items: ['Genome-wide association studies', 'Genetic risk scores', 'Functional annotation & target nomination', 'Rigorous genotype QC'],
  },
  {
    area: 'Somatic mosaicism',
    items: ['Mosaic chromosomal alterations', 'Mosaic loss of chromosome Y', 'Continuous mosaic measures from genotyping intensity data'],
  },
  {
    area: 'Epidemiology & ageing',
    items: ['Population-scale biobank cohorts', 'Disease risk and progression modelling', 'Organ-specific biological ageing'],
  },
  {
    area: 'Data science',
    items: ['Machine learning for outcome prediction', 'Image-derived phenotypes', 'Reproducible, version-controlled analysis'],
  },
  {
    area: 'Laboratory',
    items: ['Cell culture & FACS', 'Human tissue and in vivo models', 'Quantitative image analysis (ImageJ)'],
  },
  {
    area: 'Communication & governance',
    items: ['UG & PG teaching', 'Technical reports & visual summaries', 'Research ethics review'],
  },
];

const firstAuthorSurname = (authors: string) => authors.split(/[ ,]/)[0].toLowerCase().replace(/[^a-z]/g, '');

export const toBibTeX = (pub: Publication) => {
  const key = `${firstAuthorSurname(pub.authors)}${pub.year}${pub.title.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}`;
  const authors = pub.authors
    .replace(/,?\s*et al\.?$/, ' and others')
    .replace(/\.$/, '')
    .split(/,\s*/)
    .join(' and ');

  return [
    `@article{${key},`,
    `  title   = {${pub.title}},`,
    `  author  = {${authors}},`,
    `  journal = {${pub.journal}},`,
    `  year    = {${pub.year}},`,
    pub.doi ? `  doi     = {${pub.doi}},` : null,
    '}',
  ].filter(Boolean).join('\n');
};

export const toAPA = (pub: Publication) =>
  `${pub.authors.replace(/\.$/, '')} (${pub.year}). ${pub.title}. ${pub.journal}.${pub.doi ? ` https://doi.org/${pub.doi}` : ''}`;

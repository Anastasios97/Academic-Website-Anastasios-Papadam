# Monthly Insights

The Insights modal is generated from `data/insights.json`.

## Automatic update

The workflow in `.github/workflows/update-insights.yml` runs on the first day
of each month. It:

1. Queries Europe PMC for recent research in genetics and genomics, retinal
   health, and ageing biology.
2. Selects recent research articles with abstracts.
3. Updates `data/insights.json`.
4. Commits the new digest to the repository.
5. Triggers the normal Vercel deployment connected to the repository.

The workflow can also be run manually from the GitHub Actions tab using
`Run workflow`.

## Local update

Run:

```bash
npm run insights:update
```

Then inspect the generated JSON and the website before committing. Automated
discovery is a starting point; important claims should still be critically
appraised against the original paper.

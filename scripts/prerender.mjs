import { readFile, rm, writeFile } from 'node:fs/promises';

const outputPath = new URL('../dist/index.html', import.meta.url);
const serverEntryPath = new URL('../dist-ssr/entry-server.js', import.meta.url);
const serverOutputPath = new URL('../dist-ssr/', import.meta.url);

const { render } = await import(serverEntryPath.href);
const appHtml = render();
const template = await readFile(outputPath, 'utf8');
const rootPlaceholder = '<div id="root"></div>';

if (!template.includes(rootPlaceholder)) {
  throw new Error('Could not find the root placeholder in dist/index.html');
}

await writeFile(
  outputPath,
  template.replace(rootPlaceholder, `<div id="root">${appHtml}</div>`),
);

await rm(serverOutputPath, { recursive: true, force: true });

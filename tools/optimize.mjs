import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = new URL('../', import.meta.url);
const editableExtensions = new Set(['.html', '.json']);
const editableRoots = ['index.html', '_payload.json', 'companies'];

const contentReplacements = [
  ['https:\\u002F\\u002Fcdn.sanity.io\\u002Ffiles', '\\u002Fcdn.sanity.io\\u002Ffiles'],
  ['https://cdn.sanity.io/files', '/cdn.sanity.io/files'],
  ['content="image/jpeg"', 'content="image/png"'],
  ['https://frigidcrow.github.io//companies/', 'https://frigidcrow.github.io/companies/'],
  ['https://frigidcrow.github.io//"', 'https://frigidcrow.github.io/"']
];

const criticalFontPreloads = '<link rel="preload" href="/fonts/Hashgraph-Title.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/PPNeueMontreal-SemiBold.woff2" as="font" type="font/woff2" crossorigin>';

const resourceSizeReplacements = [
  ['fileSize: 7168 // approximately 7KB', 'fileSize: 7147 // 7KB'],
  ['fileSize: 11264 // approximately 11KB', 'fileSize: 10568 // 10KB'],
  ['fileSize: 713728 // approximately 697KB', 'fileSize: 697340 // 681KB'],
  ['fileSize: 1097152 // approximately 1.05MB', 'fileSize: 142744 // 139KB'],
  ['fileSize: 39936 // approximately 39 KB', 'fileSize: 38904 // 38KB'],
  ['fileSize: 49152 // approximately 48 KB', 'fileSize: 39816 // 39KB'],
  ['fileSize: 102400 // approximately 100KB', 'fileSize: 19871 // 19KB'],
  ['fileSize: 524288 // approximately 512KB', 'fileSize: 721968 // 705KB'],
  ['fileSize: 51200 // approximately 50KB', 'fileSize: 248813 // 243KB'],
  ['fileSize: 135168 // approximately 132 KB', 'fileSize: 131908 // 129KB'],
  ['fileSize: 256000 // approximately 250KB', 'fileSize: 249728 // 244KB'],
  ['fileSize: 112640 // approximately 110KB', 'fileSize: 128988 // 126KB'],
  ['fileSize: 47104 // approximately 46KB', 'fileSize: 48236 // 47KB']
];

async function collect(path) {
  const absolute = new URL(path, root);
  const { stat } = await import('node:fs/promises');
  const info = await stat(absolute);
  if (info.isFile()) return editableExtensions.has(extname(path)) ? [path] : [];
  const entries = await readdir(absolute, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => collect(join(path, entry.name))));
  return nested.flat();
}

async function apply(file, replacements, transform) {
  const absolute = new URL(file, root);
  let source = await readFile(absolute, 'utf8');
  let changed = 0;
  for (const [from, to] of replacements) {
    const matches = source.split(from).length - 1;
    if (matches > 0) {
      source = source.replaceAll(from, to);
      changed += matches;
    }
  }
  if (transform) {
    const result = transform(source);
    source = result.source;
    changed += result.changed;
  }
  if (changed > 0) await writeFile(absolute, source);
  return changed;
}

const files = (await Promise.all(editableRoots.map(collect))).flat();
let total = 0;
for (const file of files) {
  const changed = await apply(file, contentReplacements, extname(file) === '.html' ? (source) => {
    if (source.includes('Hashgraph-Title.woff2" as="font"')) return { source, changed: 0 };
    return {
      source: source.replace('</head>', `${criticalFontPreloads}</head>`),
      changed: source.includes('</head>') ? 1 : 0
    };
  } : null);
  if (changed > 0) console.log(`${file}: ${changed}`);
  total += changed;
}

const runtimeFile = '_nuxt/CxCVxjwk.js';
const runtimeChanges = await apply(runtimeFile, resourceSizeReplacements);
if (runtimeChanges > 0) console.log(`${runtimeFile}: ${runtimeChanges}`);
total += runtimeChanges;

console.log(`Applied ${total} safe performance and metadata optimizations.`);

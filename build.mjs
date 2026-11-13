// React + CSS + 사진(base64)을 docs/index.html 한 파일로 묶는다.
// docs/og.jpg 는 카카오톡 미리보기용이라 별도 파일로 둔다(og:image 는 절대 URL 이어야 함).
import { build } from 'esbuild';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { CONFIG } from './src/config.js';
import { dateKo } from './src/utils.js';

const OUT = 'docs';

const result = await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  minify: true,
  write: false,
  outdir: 'out',
  format: 'iife',
  target: ['es2020', 'safari14'],
  jsx: 'automatic',
  loader: { '.jpg': 'dataurl', '.png': 'dataurl' },
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'none',
});

const js = result.outputFiles.find((f) => f.path.endsWith('.js')).text;
const css = result.outputFiles.find((f) => f.path.endsWith('.css')).text;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const { groom, bride, venue, siteUrl } = CONFIG;
const title = `${groom.name} ♥ ${bride.name} 결혼합니다`;
const desc = `${dateKo()} · ${venue.name} ${venue.hall}`;
const ogImage = `${siteUrl}og.jpg?v=1`;

const favicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%238b2430'/%3E%3Ctext x='32' y='42' font-size='28' text-anchor='middle' fill='%23f0d9a2' font-family='serif'%3E%E2%99%A5%3C/text%3E%3C/svg%3E";

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#f7f1e7" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:image" content="${esc(ogImage)}" />
<meta property="og:image:width" content="800" />
<meta property="og:image:height" content="400" />
<meta property="og:url" content="${esc(siteUrl)}" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" href="${favicon}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Serif+KR:wght@400;500;600;700&family=Pinyon+Script&display=swap" />
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${js.replace(/<\/script/gi, '<\\/script')}</script>
</body>
</html>
`;

if (!existsSync(OUT)) mkdirSync(OUT);
writeFileSync(`${OUT}/index.html`, html);
writeFileSync(`${OUT}/.nojekyll`, '');
if (!existsSync(`${OUT}/og.jpg`)) console.warn('⚠ docs/og.jpg 가 없습니다. 카카오톡 미리보기 이미지가 표시되지 않습니다.');
console.log(`built ${OUT}/index.html (${(html.length / 1024).toFixed(0)} KB)`);

// Tiny static site builder: src/ -> dist/
//
// .html files that start with a `---` front matter block are rendered into the
// shared layout (head + nav partials). Every other file is copied as-is.
//
// Front matter keys:
//   title       page name (used in <title>, and in the breadcrumb for _projects/)
//   description meta description (optional, falls back to the site default)
//   nav         about | projects | contact | none (top-level pages only)
//   bodyAttrs   extra attributes for <body>
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync, statSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';

const SRC = 'src';
const OUT = 'dist';
const SITE = 'jesses.co.tt';
const AUTHOR = 'Jesse Scott';
const ORIGIN = 'https://www.jesses.co.tt';
const DEFAULT_DESCRIPTION = 'The Website of Jesse Scott';
const pages = []; // URL paths of rendered pages, for the sitemap

const partial = name => readFileSync(join(SRC, '_partials', name), 'utf8').replace(/\r\n/g, '\n').replace(/\n$/, '');
const fill = (tpl, vars) => tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');

function parse(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, content: m[2] };
}

function render(file, { meta, content }) {
  const isProject = relative(SRC, file).split(sep)[0] === '_projects';
  if (!meta.description) console.warn(`warning: ${file} has no description`);
  const root = isProject ? '../' : '';
  const urlPath = '/' + relative(SRC, file).split(sep).join('/');
  const url = urlPath === '/index.html' ? '/' : urlPath;
  pages.push(url);
  const vars = {
    root,
    origin: ORIGIN,
    canonical: ORIGIN + url,
    title: meta.title ?? '',
    description: meta.description ?? DEFAULT_DESCRIPTION,
    pageTitle: meta.title ? `${meta.title} \u2013 ${AUTHOR}` : `${SITE} \u2013 ${AUTHOR}`,
  };
  for (const n of ['about', 'projects', 'contact']) vars[`${n}Active`] = meta.nav === n ? ' class="active"' : '';
  const nav = fill(partial(isProject ? 'nav-project.html' : 'nav-page.html'), vars);
  const body = meta.bodyAttrs ? `<body ${meta.bodyAttrs}>` : '<body>';
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '',
    fill(partial('head.html'), vars),
    '',
    '\t<!-- BODY -->',
    `\t${body}`,
    '',
    nav,
    '',
    content.replace(/\s+$/, ''),
    '',
    '\t</body>',
    '</html>',
    '',
  ].join('\n');
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== '_partials') walk(path);
      continue;
    }
    const dest = join(OUT, relative(SRC, path));
    mkdirSync(dirname(dest), { recursive: true });
    const page = name.endsWith('.html') ? parse(readFileSync(path, 'utf8')) : null;
    if (page) writeFileSync(dest, render(path, page));
    else copyFileSync(path, dest);
  }
}

rmSync(OUT, { recursive: true, force: true });
walk(SRC);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.sort().map(url => `  <url><loc>${ORIGIN}${url}</loc></url>`),
  '</urlset>',
  '',
].join('\n');
writeFileSync(join(OUT, 'sitemap.xml'), sitemap);
console.log(`Built ${SITE} -> ${OUT}/`);

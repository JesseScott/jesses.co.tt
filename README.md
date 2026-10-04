jesses.co.tt
============

it's my website!

## Layout

- `src/` - the site. Pages with a `---` front matter block are rendered into the shared layout; everything else is copied as-is.
- `src/_partials/` - shared `<head>` and nav.
- `build.mjs` - zero-dependency builder, `src/` -> `dist/`.

```
npm run build   # writes dist/
```

Front matter keys: `title`, `description`, `nav` (`about` | `projects` | `contact` | `none`), `bodyAttrs`.

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and uploads `dist/` to WHC over FTPS (only changed files). PRs run a build check.

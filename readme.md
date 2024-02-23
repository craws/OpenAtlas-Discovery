# OpenAtlas Discovery

OpenAtlas Discovery is a presentation website for [OpenAtlas](https://openatlas.eu) projects.

A demo website is deplyed at <https://openatlas-discovery-demo.acdh-ch-dev.oeaw.ac.at>.

## Content management (CMS)

The website comes with a content management system, which is deployed at `/admin` and commits all
content chanes to the website repository on GitHub. All content is stored in plain text (markdown or
json), and can also be edited directly with your favourite text editor.

- "Config" collection: Main configuration file for the website. Allows setting default locale, brand
  colors, logos. Saves to [`project.config.json`](project.config.json).
- "Metadata" collection: Project metadata which needs translation in all suppoted languages. Saves
  to [`messages/:locale/project.json`](messages/en/project.json).
- "Pages" collection: Custom content pages. Saves to [`content/pages/*.md`](content/pages).
- "Team" collection: Team members. Saves to [`content/team/*.md`](content/team).

When developing locally, you can run a development CMS server with:

```bash
pnpm run dev:cms
```

This server will _not_ commit content changes to GitHub, but write to the local filesystem instead.

## Development

### Pre-requisites

- [Node.js v20](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)

### Environment variables

Set required environment variables in `.env.local`. Start by copying the template file:

```bash
cp .env.local.example .env.local
```

Environment variables:

- `NUXT_PUBLIC_APP_BASE_URL`: Should point to the URL where the website is deployed. Used for
  setting `<link rel="canonical">`.
- `NUXT_PUBLIC_API_BASE_URL`: Should point to the OpenAtlas backend API used by this website.
- `NUXT_PUBLIC_OPENAPI_BASE_URL`: Should point to the OpenAtlas backend's OpenAPI schema.
- `NUXT_PUBLIC_DATABASE`: Whether the configured OpenAtlas backend is ready, and links to the
  `/database` and `/maps` pages should be added to the website. Allowed values are: "enabled" or
  "disabled".

- `NUXT_PUBLIC_MAP_BASELAYER_URL`: The map base layer used on the "/maps" page. Defaults to an
  OpenStreetMap map.
- `NUXT_PUBLIC_MAP_BASELAYER_ATTRIBUTION`: Attribution text for the above map.

- `NUXT_PUBLIC_MATOMO_BASE_URL` and `NUXT_PUBLIC_MATOMO_ID`: When using `matomo` for website
  analytics, set the base URL and property id (optional).
- `NUXT_PUBLIC_BOTS`: Set this to "enabled" to allow web crawlers like the Google bot to index this
  website.

- `NUXT_PUBLIC_REDMINE_ID`: Needed when using the ACDH-CH imprint service for the imprint page.

### Install dependencies

```bash
pnpm install
```

### Development server

Run a development server at <http://localhost:3000>:

```bash
pnpm run dev
```

### Authentication

The CMS allows signing in with a GitHub account via OAuth.

In local development, this is optional: you can run a CMS proxy server, which commits content to the
local filesystem, instead of GitHub, and requires to authentication.

```bash
pnpm run dev:cms
```

To properly configure OAuth, create a "GitHub OAuth App" at
<https://github.com/settings/developers>, and set these environment variables:

- `OAUTH_ALLOWED_ORIGIN`: Should point the the URL where the website is deployed. Used by the CMS
  for authentication.
- `OAUTH_REDIRECT_URL`: Should point to the "Authorization callback URL" configured in the "GitHub
  OAuth App". Usually this should point to the `/api/oauth/callback` path on `OAUTH_ALLOWED_ORIGIN`.
- `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET`: The GitHub client id and client secret from the newly
  created "GitHub OAuth App".

### Deployment

The website is deployed via [GitHub action](./.github/workflows/build-deploy.yml).

### Issues

To report bugs, or request new features, file an issue on our
[Redmine instance](https://redmine.openatlas.eu/projects/openatlas-discovery/issues).

## License

All code unless otherwise noted is licensed under the terms of the MIT License (MIT). Please refer
to the file LICENSE in the root directory of this repository.

All documentation and images unless otherwise noted are licensed under the terms of Creative Commons
Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit
<http://creativecommons.org/licenses/by-sa/4.0/>.

# About

OpenAtlas Discovery is a presentation web application for
[OpenAtlas](https://openatlas.eu) projects,
which is still in early development.

At the moment we are in the concept phase and this is just a basic start point
for further development.
* [Demo](https://frontend-demo-dev.openatlas.eu/)
* [Wiki](https://redmine.openatlas.eu/projects/openatlas-discovery/wiki/Wiki)
* [Issues](https://redmine.openatlas.eu/projects/openatlas-discovery/issues)

# Content v2 Minimal Starter
Look at the [Content documentation](https://content-v2.nuxtjs.org/) to learn
more.

## Setup
Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server
Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production
To build the application for production run:

```bash
npm run generate
```
This will generate the folder `.output/public` which contains the files needed to serve the site on any webserver.

For locally preview production build:
```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment)
for more information.

# Configuration
## Content
The content management is handled by [Content V2](https://content.nuxtjs.org/).
The content of the landing page is defined by the files in 
`/content` + language e.g. `/en` + `index.md`.

# Licensing
All code unless otherwise noted is licensed under the terms of the MIT License
(MIT). Please refer to the file LICENSE in the root directory of this
repository.

All documentation and images unless otherwise noted are licensed under the
terms of Creative Commons Attribution-ShareAlike 4.0 International License.
To view a copy of this license, visit
[http://creativecommons.org/licenses/by-sa/4.0/](http://creativecommons.org/licenses/by-sa/4.0/)


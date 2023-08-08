# About

OpenAtlas Discovery is a presentation web application for
[OpenAtlas](https://openatlas.eu) projects.

At the moment we are in early development.
* [Demo](https://frontend-demo-dev.openatlas.eu/)
* [Wiki](https://redmine.openatlas.eu/projects/openatlas-discovery/wiki/Wiki)
* [Issues](https://redmine.openatlas.eu/projects/openatlas-discovery/issues)

# Content 
The content can be managed either by placing the content into the `content` directory as well as the configuration file `discoveryConfig.json`

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

and to set the environment variables:

```
NUXT_IMAGE_DOMAINS = domain-url-for-images // See nuxt image documentation
```

#### Development Setup
To make use of automatic linting on commit, initiate husky by running the command

```bash
# npm
npm run prepare
```

## Content Fetching

If you want to fetch the content and configuration from a Content repository, you can do so by running the `..\deployment\loadContent.mjs` script.

Set up the enviroment Variables `CONTENT_REPO` & `CONTENT_BRANCH`:

```bash
# Windows
$env:CONTENT_REPO='link-to-clone-your-repository'

$env:CONTENT_BRANCH='main'
```

Run the script:

```bash
# npm
npm run load-content
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

## Testing

To test the frontend we use Cypress to run E2E tests.

### Testing with Cypress

1. To start the test with cypress, first start the nuxt server (`npm run dev`)
2. To start the testing you have two options:
	1. Start the UI with `npm run cy:open` this will open a new window that will allow you to run test individually, as well as inspect each of the steps during the test.
	2. Run all the specs directly with `npm run cy:run`. This will run through all the tests and output the results in the console. If you run `npm run cy:run-record` cypress will also record videos of the tests and save them under `cypress/videos`.

### Developing with and for Cypress

- To enable tests to run properly even when changing component we should use selectors that are prone to stay the same. Therefore we should follow the [Best Practice](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) and add a `data-test` attribute to elements we intend to test.

# Licensing
All code unless otherwise noted is licensed under the terms of the MIT License
(MIT). Please refer to the file LICENSE in the root directory of this
repository.

All documentation and images unless otherwise noted are licensed under the
terms of Creative Commons Attribution-ShareAlike 4.0 International License.
To view a copy of this license, visit
[http://creativecommons.org/licenses/by-sa/4.0/](http://creativecommons.org/licenses/by-sa/4.0/)

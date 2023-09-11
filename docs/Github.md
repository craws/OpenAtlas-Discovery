## Github Actions

This project is set up to work with github actions. On a commit, the following actions are performed:

 - The content is fetched from the configured content repositories
 - The project is built and tested
 - The project is deployed to the configured sites

For these steps, containers are spun up to run all these actions. The containers use the `node` and `npm` version specified in the `package.json` file under `engines`.

**Note:** The `npm` version is used to install dependencies, and the `node` version is used to run the project. If the actions fail but the build and run step work locally make sure that the versions match.
You can check the versions of `node` and `npm` by running `node -v` and `npm -v` in the terminal.

For version switching e.g. when working in multiple projects tools like e.g. [Node Version Switcher (NVS)](https://github.com/jasongin/nvs) can be usefull.

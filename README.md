# ttoss Modules

## Getting Started

The necessary steps to run Modules are below:

You need to have Yarn installed. For the best way to have it, visit this [link](https://classic.yarnpkg.com/en/docs/getting-started). After this:

Clone the repo

```bash
git clone https://github.com/ttoss/modules
```

On the root, run:

```bash
yarn
yarn build
```

Go to _docs/storybook_ and run:

```bash
yarn dev
```

## Examples

Application examples that use the modules for testing and documentation purposes.

Some rules to create an example:

- `private: true`: you should set the package private to avoid publishing it to NPM.
- `version: 0.0.0`: as Lerna won't bump the version, we'll keep them as `0.0.0` by default.
- `build:after`: you can't use `build` because it'll build the package at the same time that modules are being built. Scripts execute `build:after` after running `build`.

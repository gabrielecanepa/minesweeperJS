# MinesweeperJS

## Usage

Clone the repository on your computer. You must have [Node.js](https://nodejs.org) (> v4) and [Yarn](https://yarnpkg.com/lang/en/docs/install) installed:

```bash
git clone git@github.com:gabrielecanepa/minesweeperJS.git
cd minesweeperJS
rm -rf .git
yarn install
```

Make sure you have `./node_modules/.bin` in your `$PATH`. This way you can run your server with:

```bash
webpack-dev-server
```

### Scripts

Some scripts are provided in your `package.json`.

To start a local server on port `8080`:

```bash
yarn start
```

To lint all your JavaScript and CSS/SCSS files:

```bash
yarn lint
```

To build your static files:

```bash
yarn build
```

To push the built files to the `gh-pages` branch and deploy on [GitHub Pages](https://pages.github.com):

```bash
yarn deploy
```

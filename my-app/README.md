# Project setup

See [React With Typescript Best Practices](https://www.sitepoint.com/react-with-typescript-best-practices/) (primary source) and [Using EsLint and Prettier in a Typescript Project](https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project) (secondary reference as needed).

## Adjustments:

1. In eslintrc.js, use 'prettier', not prettier/@typescript-eslint
2. In Settings.json, use the settings from the first, NOT the second article (options there won't work with 3 below) . Seems like invoking Prettify on save works for tsx and not ts though ... hmmmm.
3. Also in eslintrc.js, add the rule 'prettier/prettier': 0. Unless you want prettier to cause endless errors.

### Required VSCode Extensions:

1. ESLint
2. Prettier

### Recommended extensions:

1. Debugger for Chrome
2. ES7 React/Redux/GraphQL/React-Native snippets
3. npm / npm intellisense
4. VSCode React Refactor

### Package installation

1. Install yarn
2. This includes the .vscode settings directory in the top level as an example. Run npm install in both the my-app subfolder and it's parent folder.

# Typescript with React resources

1. [Typescript Cheatsheet for React](https://github.com/typescript-cheatsheets/react)
2. [Reference Guide for Typescript in React](https://blog.logrocket.com/your-reference-guide-to-using-typescript-in-react/)

# Issues

1. I was not able to successfully type the translations object. Judging by online comments, there are bugs in the package. 'Type instantiation is excessively deep and possibly infinite' bug. [React i18Next Typescript Documentation](https://react.i18next.com/latest/typescript)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run these. These should also be available in the Explorer under NPM Scripts (bottom left) for easy access (is this dependent on VSCode extensions?).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

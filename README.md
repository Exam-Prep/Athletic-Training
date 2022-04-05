<!-- @format -->

# Athletic-Training

Exam Prep software for masters in Athletic Training students at Whitworth University.

This project is developed as a service learning requirement for Whitworth University's CS 472 - Software Engineering.

## Development

### Getting Started for Development

-   Install [node.js LTS](https://nodejs.org)
-   Install [yarn](https://classic.yarnpkg.com/en/docs/install)
-   Open the project in your preferred IDE.
-   If using VS Code install the recommended extensions

### Building for Development

-   run `yarn` from base project directory to download all npm packages
-   navigate to [localhost:3000](https://localhost:3000) to view app in browser
-   refresh page when changes are made

### Code Formatting

Code is formatted/linted with [Prettier](https://prettier.io), [ESLint](https://eslint.org), and [StyleLint](https://stylelint.io). All three are installed as development dependencies in this project. Please ensure all three are run and complete without errors before pushing code to this project or opening a PR. You can run all three using `yarn lint` or run them individually using `yarn [formatter name]`.

## Building for Production

-   run `yarn build`
-   output will be placed in /dist folder on your coputer
    -   Note: this file will not be checked into source control
-   run `yarn start` to run the production version
-   navigate to [localhost:3000](https://localhost:3000) to view the production app in browser

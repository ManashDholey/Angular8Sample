# Angular8Project

This repository contains a sample Angular 8 application generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3. It is intended to provide a solid starting point for learning Angular, building component-based UIs, and understanding the standard project structure used by Angular applications.

Angular is a framework for building dynamic single-page applications using TypeScript, modular components, and reusable services. This project reflects the default Angular 8 app setup so you can start developing features without having to configure the build tooling from scratch.

## Project Overview

This app is a starter project created by Angular CLI. It includes the default structure for a frontend web app and demonstrates the basic Angular workflow:

- creating and organizing components
- editing app logic and templates
- serving the application locally
- building the app for production
- using Angular CLI for project scaffolding

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- npm
- Angular CLI (`npm install -g @angular/cli`)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ManashDholey/Angular8Sample.git
cd Angular8Sample
npm install
```

## Development server

Run the following command to start the app locally:

```bash
ng serve
```

Then open the browser at:

```text
http://localhost:4200/
```

The application will automatically reload whenever you change any files in the project.

## Code scaffolding

Use Angular CLI to generate new application pieces quickly:

```bash
ng generate component component-name
```

You can also generate other Angular artifacts such as directives, pipes, services, classes, guards, interfaces, enums, and modules:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

This is useful for keeping the app organized as it grows.

## Build

To build the project for local development and deployment, run:

```bash
ng build
```

The build output will be generated in the `dist/` directory.

For a production build, use:

```bash
ng build --prod
```

## Testing

Angular CLI includes support for automated tests using Karma and Jasmine:

```bash
ng test
```

This helps validate the app as you add features or fix bugs.

## Project Structure

A typical Angular project contains the following important items:

```text
Angular8Sample/
├── e2e/                 # End-to-end test files
├── node_modules/       # Installed dependencies
├── src/                # Application source code
│   ├── app/            # Components, services, and app logic
│   ├── assets/         # Static files such as images and icons
│   ├── environments/   # Environment configuration
│   ├── index.html      # Main HTML file
│   ├── main.ts         # Application entry point
│   └── styles.css      # Global styling
├── angular.json        # Angular CLI configuration
├── package.json        # Project scripts and dependencies
├── tsconfig.json       # TypeScript configuration
├── tslint.json         # Linting configuration
├── README.md           # Project documentation
└── ...
```

## Typical Workflow

1. Install dependencies with `npm install`
2. Run the app with `ng serve`
3. Add or modify Angular components and services
4. Test the app with `ng test`
5. Build the production bundle with `ng build --prod`

## Further help

To get more help with Angular CLI, run:

```bash
ng help
```

You can also review the official Angular CLI documentation here:

- [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)

## Notes

This repository is a basic Angular starter app and is useful as a foundation for learning Angular, experimenting with components, or creating a small application from scratch.

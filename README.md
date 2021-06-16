# Interview Scheduler

## Project Features

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.

- Data is persisted by the API server using a PostgreSQL database.

- The client application communicates with an API server over HTTP, using the JSON format.

- Jest tests are used through the development of the project.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
- Babel/core
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Babel-loader
- Node-sass
- Prop-types
- React-test-renderer

### Technical Specifications

- React
- Webpack, Babel
- Axios, WebSockets
- Axios
- Storybook, Webpack Dev Server, Jest, Testing Library

### Main Page

!['Main page'](https://github.com/Zio7711/scheduler/blob/master/docs/mainPage.png?raw=true)
_Interviews can be booked between Monday and Friday._
_A user can switch between weekdays._

### Creating an appointment

!['book-new-apt'](https://raw.githubusercontent.com/Zio7711/scheduler/master/docs/Form.png)
_A user can book an interview in an empty appointment slot._

### Deleting an appointment

!['cancel-apt-confirm-delete'](https://github.com/Zio7711/scheduler/blob/master/docs/deletePage.png?raw=true)
_A user can cancel an existing interview._

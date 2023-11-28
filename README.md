# QuizApp

This repo contains a quiz app written using React and TypeSctipt

## About this application

This simple quiz app allows users to create their own quizzes by choosing multiple categories and difficulty levels, I've used [React Select](https://react-select.com/home) library to make this process
as simple as possible. All the question data comes from [THE TRIVIA API](https://the-trivia-api.com/), to fetch this data I've used [axios](https://axios-http.com/docs/intro) and asynThunks 
from [ReduxToolkit](https://redux-toolkit.js.org/). The app counts all points that the user gets and displays them on the Result page, as well as all the questions that were generated for the quiz with all the 
correct answers as well as all answers that have been chosen.

# How to start this app on your device 

```
# clone this repo 
git clone https://github.com/QuickerMaths/Expense-Tracker-ContextAPI

# install dependencies 
npm i

# start the local server 
npm run dev
```

## Full Techstack

* [TypeScript](https://www.typescriptlang.org/)
* [React](https://react.dev/) - frontend framework
* [React Router Dom](https://reactrouter.com/en/main) - routing
* [ReduxToolkit](https://redux-toolkit.js.org/) - state menagment
* [axios](https://axios-http.com/docs/intro) - data fetching
* [React Select](https://react-select.com/home) - dropdown select
* [TailwindCSS](https://tailwindcss.com/) - inline styles 

## Todo

- [x] Add time limit for each question 
- [x] Allow the user to choose a number of questions

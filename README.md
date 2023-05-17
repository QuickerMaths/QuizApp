# [QuizApp](quickermaths.github.io/QuizApp/)

This repo contains quiz app written using React and TypeSctipt

## About this appliaction

This simple quiz app allows user to create his own quiz by choosing multiple categories and difficulty levels, I've used [React Select](https://react-select.com/home) library to make this process
as simple as possible. All the question data comes from [THE TRIVIA API](https://the-trivia-api.com/), to fetch this data I've used [axios](https://axios-http.com/docs/intro) and asynThunks 
from [ReduxToolkit](https://redux-toolkit.js.org/). App counts all points that user gets and displays it on the Result page, as well as all the questions that were generated for the quzi with all the 
correct answers as well as all answers that has choosed.

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

- [ ] Add time limit for each question 
- [ ] Allow user to choose number of questions

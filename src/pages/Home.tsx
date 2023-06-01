import React, { ChangeEvent, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useGetCategories from "../hooks/useGetCategories";
import OptionType from "../pages/Home";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useMapEndpointParams } from "../hooks/useMapEndpointParams";
import { fetchQuiz } from "../features/asyncThunk/fetchQuiz";
import { useNavigate } from "react-router-dom";
import {
  setQuizLabelParams,
  setTimeForQuestion,
} from "../features/slice/quizSlice";

const optionsDifficulty = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const optionsLimit = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
  { value: 30, label: "30" },
  { value: 35, label: "35" },
  { value: 40, label: "40" },
  { value: 45, label: "45" },
  { value: 50, label: "50" },
];

const optionsTime = [
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 75, label: "75" },
  { value: 100, label: "100" },
];

const Home = () => {
  const animatedComponents = makeAnimated();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const optionsCategories = useGetCategories();

  const [categories, setCategories] = useState<(typeof OptionType)[]>([]);
  const [difficulty, setDifficulty] = useState<(typeof OptionType)[]>([]);
  const [questionLimit, setQuestionLimit] = useState({ value: 5, label: "5" });
  const [questionTime, setQuestionTime] = useState({
    value: 100,
    label: "100",
  });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const categoryParams = useMapEndpointParams(categories);
    const difficultyParams = useMapEndpointParams(difficulty);

    try {
      await dispatch(
        fetchQuiz({
          category: categoryParams,
          difficulty: difficultyParams,
          limit: questionLimit.value,
        })
      ).unwrap();

      dispatch(setTimeForQuestion(questionTime.value));

      dispatch(
        setQuizLabelParams({
          categoryLabel: categories.map((category: any) => {
            return category.label;
          }),
          difficultyLabel: difficulty.map((difficulty: any) => {
            return difficulty.label;
          }),
        })
      );

      navigate("/quiz");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="h-[92%] bg-gray-300 flex flex-col justify-center items-center gap-5 ">
      <h1 className="text-4xl font-bold text-center">Start your quiz</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5 justify-center items-center md:w-1/2"
      >
        <label htmlFor="category">Choose category/categories</label>
        <Select
          name="category"
          id="category"
          required
          className={"w-3/4"}
          components={animatedComponents}
          isMulti
          options={optionsCategories}
          onChange={(selectedOption: any) => setCategories(selectedOption)}
        />
        <label htmlFor="difficulty">Choose difficulty</label>
        <Select
          name="difficulty"
          id="difficulty"
          required
          className={"w-3/4"}
          components={animatedComponents}
          isMulti
          options={optionsDifficulty}
          onChange={(selectedOption: any) => setDifficulty(selectedOption)}
        />
        <label htmlFor="question-limit">Number of questions</label>
        <Select
          name="question-limit"
          id="question-limit"
          required
          className={"w-3/4"}
          components={animatedComponents}
          options={optionsLimit}
          onChange={(selectedOption: any) => setQuestionLimit(selectedOption)}
        />
        <label htmlFor="question-time">Seconds for each question</label>
        <Select
          name="question-time"
          id="question-time"
          required
          className={"w-3/4"}
          components={animatedComponents}
          options={optionsTime}
          onChange={(selectedOption: any) => setQuestionTime(selectedOption)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-10 rounded-md"
        >
          Start Quiz
        </button>
      </form>
    </section>
  );
};

export default Home;

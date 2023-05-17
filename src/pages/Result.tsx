import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { resetQuiz } from "../features/slice/quizSlice";

const Result = () => {
  const { userPoints, quizLabelParams } = useAppSelector(
    (state: RootState) => state.quizSlice
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section className="h-[92%] bg-gray-300 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col items-center justify-center gap-10 px-5 py-10 md:p-20 bg-blue-400 rounded-lg w-[90%] md:w-[40%]">
        <h2 className="text-5xl font-bold text-white underline text-center">
          Your result
        </h2>
        <p className="text-3xl font-bold text-white text-center">
          You scored <span className="text-5xl text-black">{userPoints}</span>{" "}
          out of 10 points
        </p>
        <div className="flex flex-col justify-center items-center gap-3">
          <h3 className="text-2xl font-bold text-white underline">
            Categories:
          </h3>
          <ul className="text-center">
            {quizLabelParams.categoryLabel.map((label) => (
              <li>{label}</li>
            ))}
          </ul>
          <h3 className="text-2xl font-bold text-white underline">
            Difficulty:
          </h3>
          <ul>
            {quizLabelParams.difficultyLabel.map((label) => (
              <li>{label}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <button
            className="bg-blue-200 hover:bg-blue-100  transition-colors py-2 px-5 rounded-lg cursor-pointer "
            onClick={() => {
              navigate("/user-answers", { replace: true });
            }}
          >
            Check your answers
          </button>
          <button
            className="bg-blue-200 hover:bg-blue-100  transition-colors py-2 px-5 rounded-lg cursor-pointer "
            onClick={() => {
              dispatch(resetQuiz());
              navigate("/", { replace: true });
            }}
          >
            Start new quiz
          </button>
        </div>
      </div>
    </section>
  );
};

export default Result;

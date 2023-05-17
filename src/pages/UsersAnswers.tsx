import React from "react";
import SummaryQuestion from "../components/SummaryQuestion";
import { QuestionType, resetQuiz } from "../features/slice/quizSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const UsersAnswers = () => {
  const { quiz } = useAppSelector((state: RootState) => state.quizSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section className="min-h-[92%] bg-gray-300 flex flex-col justify-center items-center gap-5 py-10">
      <div className="flex flex-col items-center justify-center gap-10 px-5 py-10 md:p-20 bg-blue-400 rounded-lg w-[90%] md:w-[40%]">
        <h2 className="text-5xl font-bold text-white underline">
          Your Answers
        </h2>
        <ul className="flex flex-col gap-5">
          {quiz.map((question: QuestionType) => (
            <SummaryQuestion key={question.id} question={question} />
          ))}
        </ul>
        <div className="flex flex-col md:flex-row gap-5">
          <button
            className="bg-blue-200 hover:bg-blue-100  transition-colors py-2 px-5 rounded-lg cursor-pointer"
            onClick={() => {
              dispatch(resetQuiz());
              navigate("/", { replace: true });
            }}
          >
            Start new quiz
          </button>
          <button
            className="bg-blue-200 hover:bg-blue-100  transition-colors py-2 px-5 rounded-lg cursor-pointer"
            onClick={() => {
              navigate("/result", { replace: true });
            }}
          >
            Go back to result
          </button>
        </div>
      </div>
    </section>
  );
};

export default UsersAnswers;

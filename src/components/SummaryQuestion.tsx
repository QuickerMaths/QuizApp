import React from "react";
import { QuestionType } from "../features/slice/quizSlice";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";

interface Props {
  question: QuestionType;
}

const SummaryQuestion: React.FC<Props> = ({
  question: {
    question: { text },
    correctAnswer,
    index,
  },
}) => {
  const { usersAnswers } = useAppSelector(
    (state: RootState) => state.quizSlice
  );

  const userAnswer = usersAnswers.find((_, i) => i === index - 1);

  return (
    <li className="bg-blue-800 rounded-md p-2">
      <p className="text-lg font-medium text-white underline">{text}</p>
      <p className="text-lg font-medium text-white">
        Your answer:
        <span
          className={`${
            userAnswer === correctAnswer ? "text-green-400" : "text-red-400"
          }`}
        >
          {userAnswer}
        </span>
      </p>
      <p className="text-lg font-medium text-white">
        Correct answer: <span className="text-green-400">{correctAnswer}</span>
      </p>
    </li>
  );
};

export default SummaryQuestion;

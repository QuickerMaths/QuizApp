import React, { useState } from "react";
import { submitAnswer } from "../features/slice/quizSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

interface Props {
  answer: string;
  quizIndex: number;
  correctAnswer: string;
  disableButton: React.MutableRefObject<boolean>;
}

const Answer: React.FC<Props> = ({
  answer,
  quizIndex,
  correctAnswer,
  disableButton,
}) => {
  const dispatch = useAppDispatch();

  const [answerClicked, setAnswerClicked] = useState<boolean>(false);

  return (
    <li
      className={`w-[45%] md:w-[40%] h-[40%] ${
        !answerClicked
          ? "bg-blue-400 md:hover:bg-blue-500"
          : answer === correctAnswer
          ? "bg-green-400"
          : "bg-red-400"
      } flex justify-center items-center rounded-md text-white md:text-2xl cursor-pointer transition-colors overflow-auto`}
    >
      <button
        onClick={() => {
          disableButton.current = true;
          setAnswerClicked(true);
          setTimeout(() => {
            disableButton.current = false;
            setAnswerClicked(false);
            dispatch(submitAnswer({ answer, quizIndex }));
          }, 1500);
        }}
        className="w-full h-full"
      >
        {answer}
      </button>
    </li>
  );
};

export default Answer;

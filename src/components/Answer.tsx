import React, { useState } from "react";
import { submitAnswer } from "../features/slice/quizSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";

interface Props {
  answer: string;
  quizIndex: number;
  correctAnswer: string;
  setDisableButtons: React.Dispatch<React.SetStateAction<boolean>>;
  disableButtons: boolean;
  setStartTimer: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

const Answer: React.FC<Props> = ({
  answer,
  quizIndex,
  correctAnswer,
  disableButtons,
  setDisableButtons,
  setStartTimer,
  setTimeLeft,
}) => {
  const dispatch = useAppDispatch();
  const timeForQuestion = useAppSelector(
    (state: RootState) => state.quizSlice.timeForQuestion
  );

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
          setAnswerClicked(true);
          setDisableButtons(true);
          setStartTimer(false);
          setTimeout(() => {
            setAnswerClicked(false);
            setDisableButtons(false);
            dispatch(submitAnswer({ answer, quizIndex }));
            setTimeLeft(timeForQuestion);
            setStartTimer(true);
          }, 2000);
        }}
        className="w-full h-full"
        disabled={disableButtons}
      >
        {answer}
      </button>
    </li>
  );
};

export default Answer;

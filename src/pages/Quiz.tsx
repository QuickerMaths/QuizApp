import React, { useState } from "react";
import Answer from "../components/Answer";
import { QuestionType } from "../features/slice/quizSlice";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Quiz = () => {
  const { quiz, quizIndex, quizEnd, userPoints } = useAppSelector(
    (state: RootState) => state.quizSlice
  );
  console.log(quiz);
  const navigate = useNavigate();

  const [disableButtons, setDisableButtons] = useState<boolean>(false);

  useEffect(() => {
    quizEnd && navigate("/result", { replace: true });
  }, [quizEnd]);

  const question = quiz.find((question) => question.index === quizIndex);

  const {
    question: { text },
    correctAnswer,
    incorrectAnswers,
  } = question as QuestionType;

  const [shuffleAnswers, setShuffleAnswers] = useState<string[]>([]);

  function shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const answers = [...incorrectAnswers, correctAnswer];
    setShuffleAnswers(shuffleArray(answers));
  }, [question]);

  return (
    <div className="flex flex-col justify-center items-center h-[92%]">
      <div className="flex justify-around items-center w-[70%]">
        <h2 className=" font-bold md:text-3xl ml-4">Points {userPoints}</h2>
        <h2 className=" font-bold md:text-3xl ml-4">
          Question {quizIndex}/{quiz.length}
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center w-[90%] md:w-[70%] h-[60%] rounded-md bg-slate-300 mt-10">
        <h2 className="text-xl font-bold text-center px-2">{text}</h2>
        <ul className="flex flex-wrap gap-2 w-[90%] h-[60%] justify-center items-center mt-10">
          {shuffleAnswers.map((answer, i) => (
            <Answer
              answer={answer}
              quizIndex={quizIndex}
              correctAnswer={correctAnswer}
              disableButtons={disableButtons}
              setDisableButtons={setDisableButtons}
              key={i}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;

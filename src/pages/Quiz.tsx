import React, { useState } from "react";
import Answer from "../components/Answer";
import quizSlice, {
  QuestionType,
  submitAnswer,
} from "../features/slice/quizSlice";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Line } from "rc-progress";

const Quiz = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { quiz, quizIndex, quizEnd, userPoints, timeForQuestion } =
    useAppSelector((state: RootState) => state.quizSlice);

  //finding question by index

  const question = quiz.find((question) => question.index === quizIndex);

  const [disableButtons, setDisableButtons] = useState<boolean>(false);

  //destructuring question object

  const {
    question: { text },
    correctAnswer,
    incorrectAnswers,
  } = question as QuestionType;

  //shuffling answers

  useEffect(() => {
    const answers = [...incorrectAnswers, correctAnswer];
    setShuffleAnswers(shuffleArray(answers));

    //starting timer after question is loaded

    setStartTimer(true);
  }, [question]);

  const [shuffleAnswers, setShuffleAnswers] = useState<string[]>([]);

  function shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  // time for question and progress bar

  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(timeForQuestion);
  const [timesUp, setTimesUp] = useState<boolean>(false);

  useEffect(() => {
    if (startTimer) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTimer, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && quizIndex <= quiz.length) {
      setStartTimer(false);
      setTimesUp(true);
      setTimeout(() => {
        dispatch(submitAnswer({ answer: "Not fast enough", quizIndex }));
        setTimesUp(false);
      }, 2000);
      setTimeLeft(timeForQuestion);
    } else if (timeLeft === 0) {
      setStartTimer(false);
      dispatch(submitAnswer({ answer: "Not fast enough", quizIndex }));
    }
  }, [timeLeft]);

  //redirecting to result page if quiz has ended

  useEffect(() => {
    quizEnd && navigate("/result", { replace: true });
  }, [quizEnd]);

  return (
    <div className="flex flex-col justify-center items-center h-[92%]">
      <div className="flex flex-col items-center w-[70%] gap-5">
        <div className="flex justify-between w-full">
          <h2 className=" font-bold md:text-3xl ml-4">Points {userPoints}</h2>
          <h2 className=" font-bold md:text-3xl ml-4">
            Question {quizIndex}/{quiz.length}
          </h2>
        </div>
        <Line
          percent={timeLeft}
          strokeWidth={1}
          trailWidth={timeForQuestion}
          strokeColor="rgb(29 78 216)"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-[90%] md:w-[70%] h-[60%] rounded-md bg-slate-300 mt-10">
        {timesUp ? (
          <h2 className="font-bold text-5xl">
            Times up, prepare for another question
          </h2>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center px-2">{text}</h2>
            <ul className="flex flex-wrap gap-2 w-[90%] h-[60%] justify-center items-center mt-10">
              {shuffleAnswers.map((answer, i) => (
                <Answer
                  answer={answer}
                  quizIndex={quizIndex}
                  correctAnswer={correctAnswer}
                  disableButtons={disableButtons}
                  setDisableButtons={setDisableButtons}
                  setStartTimer={setStartTimer}
                  setTimeLeft={setTimeLeft}
                  key={i}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;

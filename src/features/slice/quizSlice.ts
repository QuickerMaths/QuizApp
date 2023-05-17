import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchQuiz } from "../asyncThunk/fetchQuiz";

export type QuestionType = {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: string;
  incorrectAnswers: string[];
  isNiche: boolean;
  index: number;
  question: {
    text: string;
  };
  regions: string[] | [];
  tags: string[] | [];
  type: string;
};

type initialStateType = {
  quiz: QuestionType[];
  quizIndex: number;
  userPoints: number;
  isLoading: boolean;
  quizEnd: boolean;
  quizLabelParams: {
    categoryLabel: string[];
    difficultyLabel: string[];
  };
  usersAnswers: string[];
};

const initialState: initialStateType = {
  quiz: [],
  quizIndex: 1,
  userPoints: 0,
  isLoading: false,
  quizEnd: false,
  quizLabelParams: {
    categoryLabel: [],
    difficultyLabel: [],
  },
  usersAnswers: [],
};

export const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    submitAnswer: (
      state,
      action: PayloadAction<{ answer: string; quizIndex: number }>
    ) => {
      const { answer, quizIndex } = action.payload;

      if (answer === state.quiz[quizIndex - 1].correctAnswer) {
        state.userPoints += 1;
      }

      if (state.quizIndex === state.quiz.length) {
        state.quizEnd = true;
        return;
      }

      state.usersAnswers.push(answer);
      state.quizIndex += 1;
    },
    setQuizLabelParams: (
      state,
      action: PayloadAction<{
        categoryLabel: string[];
        difficultyLabel: string[];
      }>
    ) => {
      state.quizLabelParams = action.payload;
    },
    resetQuiz: (_) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuiz.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchQuiz.fulfilled, (state, action) => {
      state.quizEnd = false;
      state.quiz = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchQuiz.rejected, (_, action) => {
      console.log(action.payload);
    });
  },
});

export const { submitAnswer, setQuizLabelParams, resetQuiz } =
  quizSlice.actions;

export default quizSlice.reducer;

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://the-trivia-api.com/v2";

export const fetchQuiz = createAsyncThunk(
  "quiz/fetchQuiz",
  async (
    quizData: { category: string; difficulty: string },
    { rejectWithValue }
  ) => {
    const { category, difficulty } = quizData;
    try {
      const response = await axios.get(
        `/questions/?categories=${category}&difficulties=${difficulty}`,
        {
          transformResponse: [
            (response) => {
              let data = JSON.parse(response);

              const questionsWithIndex = data.map((question) => {
                if (!question.index)
                  question.index = data.indexOf(question) + 1;
                return question;
              });

              return questionsWithIndex;
            },
          ],
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

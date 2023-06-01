import React from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import UsersAnswers from "./pages/UsersAnswers";

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="result" element={<Result />} />
          <Route path="user-answers" element={<UsersAnswers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

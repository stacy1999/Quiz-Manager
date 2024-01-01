import { Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import Quizzes from "./pages/Quiz/Quizzes"
import CreateQuiz from "./pages/Quiz/CreateQuiz";
import Quiz from "./pages/Quiz/Quiz";
import UpdateQuiz from "./pages/Quiz/UpdateQuiz";
import Question from "./pages/Question/Questions";
import AddQuestions from "./pages/Question/AddQuestions";
import AddAnswers from "./pages/Answers/AddAnswers";
import Login from "./pages/Login";

import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateQuestion from "./pages/Question/UpdateQuestion";

function App() {
  return (
      <>
          <Routes>
                  <Route path="/" element={<ProtectedRoutes />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/getAllQuizzes" element={<Quizzes />} />
                      <Route path="/createQuiz" element={<CreateQuiz />} />
                      <Route path="/addQuestions/:id" element={<AddQuestions />} />
                      <Route path="/quiz/:id" element={<Quiz />} />
                      <Route path="/question/:id" element={<Question />} />
                      <Route path="/addAnswers/:id" element={<AddAnswers />} />
                      <Route path="/updateQuiz/:id" element={<UpdateQuiz />}/>
                      <Route path="/updateQuestion/:questionId" element={<UpdateQuestion />} />
                  </Route>
              <Route path="/login" element={<Login />} />
          </Routes>
      </>
  );
}


export default App;


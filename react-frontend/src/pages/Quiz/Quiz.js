import "../pages.css"
import {useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import QuizService from "../../service/QuizService";
import QuestionService from "../../service/QuestionService";
import ViewAnswersButton from "../../components/buttons/ViewAnswersButton";
import BackButton from "../../components/buttons/BackButton";
import UpdateQuizButton from "../../components/buttons/UpdateQuizButton";
import UpdateQuestionButton from "../../components/buttons/UpdateQuestionButton";
import AddQuestionsButton from "../../components/buttons/AddQuestionsButton";

const Quiz = () => {
    let params = useParams();
    const [quizId, setQuizId] = useState(params.id);
    const [quiz, setQuiz] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isQuestionsLoading, setQuestionsLoading] = useState(true);
    const [isQuizLoading, setQuizLoading] = useState(true);
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    const getQuiz = useCallback(() => {
        QuizService.getQuiz(quizId, username, password).then(response => {
            setQuiz(response.data);
            setQuizLoading(false);
        }).catch((e) => {
            console.log(e);
            setQuizLoading(false);
        });
    }, []);

    const getQuestions = useCallback(() => {
        QuestionService.getQuestionsByQuizId(quizId, username, password).then(response => {
            setQuestions(response.data.map(
                question => ({
                    key: question.id,
                    title: question.questionTitle
                })
            ));
            setQuestionsLoading(false);
        }).catch((e) => {
            console.log(e);
            setQuestionsLoading(false);
        });
    }, []);

    useEffect(() => {
        getQuiz();
        getQuestions();
    }, [getQuiz, getQuestions])

    return (
        <div className="container">
            <h1 className="main-heading"> {quiz.title} </h1>
            {isQuestionsLoading ? (
                <div>
                    <h2 className="text-center">
                        Loading...
                    </h2>
                </div>
            ) : (
                <>
                    <div className="row">
                        {questions.map((question) => {
                            return <>
                                <div className="card-questions" key={question.key}>
                                    <div className="container">
                                        <h1><b>{questions.indexOf(question) + 1}) "{question.title}"</b></h1>
                                        <div className="row">
                                            <ViewAnswersButton text={"View Answers"} question={question.key}/>
                                            <UpdateQuestionButton text={"Update Question"} question={question.key}/>
                                        </div>
                                    </div>
                                </div>
                            </>
                        })}
                    </div>
                    <div className="buttons-group">
                        <BackButton/><UpdateQuizButton text={"Update Quiz"} quiz={quiz}/><AddQuestionsButton
                        text={"Add question"} quiz={quiz.id} from={"CreateQuestion"}/>
                    </div>
                </>
            )}
        </div>
    )
}
export default Quiz;

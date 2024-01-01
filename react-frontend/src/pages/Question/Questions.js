import {useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import QuestionService from "../../service/QuestionService";
import AnswerService from "../../service/AnswerService";
import BackButton from "../../components/buttons/BackButton";
import AddAnswersButton from "../../components/buttons/AddAnswersButton";

const Question = () => {
    let params = useParams();
    const alphabet = "ABCDE".split("");
    const [questionId, setQuestionId] = useState(params.id)
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [isQuestionLoading, setQuestionLoading] = useState(true);
    const [isAnswersLoading, setAnswersLoading] = useState(true);
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    const getQuestion = useCallback(() => {
        QuestionService.getQuestionById(questionId, username, password).then(response => {
            setQuestion(response.data);
            setQuestionLoading(false);
        }).catch((e) => {
            console.log(e);
            setQuestionLoading(false);
        });
    }, []);

    const getAnswers = useCallback(() => {
        AnswerService.getAnswers(questionId, username, password).then(response => {
            setAnswers(response.data.map(
                answer => ({
                    key: answer.id,
                    value: answer.answer
                })
            ));
            setAnswersLoading(false);
        }).catch((e) => {
            console.log(e);
            setAnswersLoading(false);
        });
    }, []);

    useEffect(() => {
        getQuestion();
        getAnswers();
    }, [getQuestion, getAnswers])

    return (
        <div className="container">
            <h2 className="main-heading"> "{question.questionTitle}" </h2>
            {isAnswersLoading ? (
                <div>
                    <h2 className="text-center">
                        Loading...
                    </h2>
                </div>
            ) : (
                <>
                    <div className="row">
                        {answers.map((answer) => {
                            return (
                                <div className="card-questions">
                                    <div className="container">
                                        <h1 key={answer.key}><b>{alphabet[answers.indexOf(answer)]}.
                                            "{answer.value}"</b></h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="buttons-group">
                        <BackButton/>
                        {answers.length < 5 && <AddAnswersButton text={"Add Answers"} question={question.id}/>}

                    </div>
                </>

            )}
        </div>
    )
}

export default Question

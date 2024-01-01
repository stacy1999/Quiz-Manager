import React, {useCallback, useEffect, useState} from "react";
import TextInput from "./TextInput";
import QuestionService from "../../service/QuestionService";
import QuizService from "../../service/QuizService";
import AddAnswersButton from "../buttons/AddAnswersButton";

const QuestionForm = (props) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [question, setQuestion] = useState(props.initialState);
    const [quiz, setQuiz] = useState([])
    const [quizLoading, setQuizLoading] = useState(false);
    const [isErrorSubmitting, setErrorSubmitting] = useState(false);
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    const saveQuestion = (event) => {
        event.preventDefault();
        setSubmitting(true);
        setErrorSubmitting(false);
        console.log(question);

        switch (props.from) {
            case "CreateQuestion":
                QuestionService.createQuestion(question, username, password)
                    .then(createResult => {
                        setQuestion({...question, id: createResult.data})
                        setSubmitted(true);
                        setSubmitting(false);
                    }).catch((e) => {
                    setSubmitting(false);
                    console.log(e)
                    setErrorSubmitting(true);
                });
                break;
            case "UpdateQuestion":
                console.log(question);
                QuestionService.updateQuestion(question.id, question, username, password)
                    .then(() => {
                        setSubmitted(true);
                        setSubmitting(false);
                    }).catch((e) => {
                    setSubmitting(false);
                    console.log(e.response.data.errors)
                    setErrorSubmitting(true);
                });
                break;
            default:
                break;
        }
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setQuestion({...question, [name]: value});
    }

    const getQuiz = useCallback(() => {
        QuizService.getQuiz(props.initialState.quizId, username, password).then(response => {
            setQuiz(response.data);
            setQuizLoading(false);
        }).catch((e) => {
            console.log(e);
            setQuizLoading(false);
        });
    }, []);

    useEffect(() => {
        getQuiz();
    }, [getQuiz])

    return (
        <div className="main-card-container">
            <h2>Quiz: {quiz.title}</h2>
            {submitted ? (
                <h4>
                    {props.from === "CreateQuestion" &&
                    <div>
                        <h3>Question successfully created!</h3>
                        <div className="card-questions">
                            <div className="container">
                                <h1><b>New Question: "{question.questionTitle}"</b></h1>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="buttons-group">
                                            <AddAnswersButton text={"Add Answers"} question={question.id}/>
                                        </ div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }{props.from === "UpdateQuestion" &&
                (<div>
                    <h3>Question successfully updated!</h3>
                    <div className="card-questions">
                        <div className="container">
                            <h2><b>New Question Title: {question.questionTitle}</b></h2>
                            <div className="row">
                                <div className="col-md-12">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
                    {isErrorSubmitting &&
                    <div className="container">
                        <p className="message error">
                            There was an error creating the quiz.<br/>
                        </p>
                    </div>}
                </h4>
            ) : (
                <div className="container">
                    <form onSubmit={saveQuestion}>
                        <TextInput type={"text"}
                                   displayName={"Question Title"}
                                   placeholder={"Title of your new question"}
                                   fieldName={"questionTitle"}
                                   value={question.questionTitle}
                                   onChange={onChange}
                                   className="text-input"/>
                        <div className="buttons-group">
                            <input type="submit" value="Submit question" disabled={isSubmitting}
                                   className="button-primary"/>
                        </div>
                    </form>
                </div>
            )}

        </div>
    )
}

export default QuestionForm

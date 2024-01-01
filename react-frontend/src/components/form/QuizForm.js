import React, {useState} from "react";
import TextInput from "./TextInput";
import QuizService from "../../service/QuizService";
import AddQuestionsButton from "../buttons/AddQuestionsButton";

const QuizForm = (props) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [quiz, setQuiz] = useState(props.initialState)
    const [submitted, setSubmitted] = useState(false);
    const [isErrorSubmitting, setErrorSubmitting] = useState(false);
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    const saveQuiz = (event) => {
        event.preventDefault();
        setSubmitting(true);
        setErrorSubmitting(false);

        switch (props.from) {
            case "CreateQuiz":
                QuizService.createQuiz(quiz, username, password)
                    .then(createResult => {
                        setQuiz({...quiz, id: createResult.data})
                        setSubmitted(true);
                        setSubmitting(false);
                    }).catch((e) => {
                    setSubmitting(false);
                    console.log(e.response.data.errors)
                    setErrorSubmitting(true);
                });
                break;
            case "UpdateQuiz":
                QuizService.updateQuiz(quiz.id, quiz, username, password)
                    .then(() => {
                        console.log("updated");
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
        setQuiz({...quiz, [name]: value});
    }

    return (
        <div className="main-card-container">
            {submitted ? (
                <h4>
                    {props.from === "CreateQuiz" &&
                    (
                        <div>
                            <h3>Quiz successfully created!</h3>
                            <div className="card-questions">
                                <div className="container">
                                    <h1><b>New Quiz: {quiz.title}</b></h1>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="buttons-group">
                                                <AddQuestionsButton text={"Add Questions"} quiz={quiz.id}
                                                                    from={"CreateQuestion"}/>
                                            </ div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {props.from === "UpdateQuiz" &&
                    (<div>
                        <h3>Quiz successfully updated!</h3>
                        <div className="card-questions">
                            <div className="container">
                                <h2><b>New Quiz name: {quiz.title}</b></h2>
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
                    <form onSubmit={saveQuiz}>
                        <TextInput type={"text"}
                                   displayName={"Title"}
                                   placeholder={"Title of your new quiz"}
                                   fieldName={"title"}
                                   value={quiz.title}
                                   onChange={onChange}/>
                        <input type="submit" disabled={isSubmitting} className="button-primary"/>
                    </form>
                </div>
            )}
        </div>
    )
}


export default QuizForm;

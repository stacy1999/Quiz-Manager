import React, {useCallback, useEffect, useRef, useState} from "react";
import QuestionService from "../../service/QuestionService";
import TextInput from "./TextInput";
import AnswerService from "../../service/AnswerService";

const AnswerForm = (props) => {
    const [disableButton, setDisableButton] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [answer, setAnswer] = useState(props.initialState);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState([]);
    const counter = useRef(0);
    const alphabet = "ABCDE".split("");
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    const onChange = (event) => {
        const {name, value} = event.target;
        setAnswer({...answer, [name]: value});
    }

    const saveAnswer = (event) => {
        event.preventDefault();
        setSubmitting(true);

        AnswerService.createAnswer(answer, username, password)
            .then(createResult => {
                setAnswer({...answer, id: createResult.data})
                answers.push(answer);
                setSubmitting(false);
                incrementCounter();
                resetForm();
            }).catch((e) => {
            setSubmitting(false);
            console.log(e)
        });
    }

    const resetForm = () => {
        setAnswer(props.initialState)
    }

    const incrementCounter = () => {
        const currentCounter = counter.current
        counter.current = currentCounter + 1
        console.log(counter);
        if (counter.current === 5) {
            setDisableButton(true);
        }
    }

    const getQuestion = useCallback(() => {
        QuestionService.getQuestionById(props.initialState.questionId, username, password).then(response => {
            setQuestion(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    const getAnswers = useCallback(() => {
        AnswerService.getAnswers(props.initialState.questionId, username, password).then(response => {
            counter.current = response.data.length
            if (counter.current === 5) {
                setDisableButton(true);
            }
            console.log(counter)
        }).catch((e) => {
            console.log(e);
        });
    }, [])

    useEffect(() => {
        getQuestion();
        getAnswers();
    }, [getQuestion, getAnswers()])

    return (
        <div>
            <div className="main-card-container">
                <h2>Add answers for question: "{question.questionTitle}"</h2>
                <form onSubmit={saveAnswer}>
                    <TextInput type={"text"}
                               displayName={"Answer"}
                               placeholder={"Answer for your new question"}
                               fieldName={"answer"}
                               value={answer.answer}
                               onChange={onChange}
                               className="text-input"/>
                    {currentNumber < 5 &&
                    <input type="submit" value="Add answer" disabled={disableButton} className="button-primary"/>}
                </form>
                <div className="row">
                    {answers.map((answer) => {
                        return (
                            <div className="container">
                                <ul>
                                    <li>{alphabet[answers.indexOf(answer)]}. "{answer.answer}"</li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AnswerForm

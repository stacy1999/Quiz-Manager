import {useParams} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import QuestionService from "../../service/QuestionService";
import BackButton from "../../components/buttons/BackButton";
import QuestionForm from "../../components/form/QuestionForm";

const UpdateQuestion = () => {
    let params = useParams();

    const initialQuestionState = {
        id: null,
        questionTitle: "",
        quizId: ""
    }

    const [question, setQuestion] = useReducer(reducer, initialQuestionState);
    const [isLoading, setLoading] = useState(true);
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    function reducer(prevState, nextState) {
        //merging the response from the API with the initial state to ensure field consistency
        nextState = {...prevState, ...nextState};
        return nextState;
    }

    const getQuestion = (id) => {
        QuestionService.getQuestionById(id, username, password).then(response => {
            setQuestion(response.data)
            setLoading(false);
        })
    }

    useEffect(() => {
        getQuestion(params.questionId)
    }, [params.questionId])

    return (
        <div className="container">
            <h1 className="main-heading"> Update Question: {question.questionTitle} </h1>
            {isLoading ? (
                <div>
                    <h4 className="text-center">
                        Loading...
                    </h4>
                </div>
            ) : (
                <>
                    <QuestionForm initialState={question} from={"UpdateQuestion"}/>
                    <div className="buttons-group">
                        <BackButton/>
                    </div>
                </>
            )}
        </div>
    )
};

export default UpdateQuestion

import "../pages.css"
import {useParams} from "react-router-dom";
import QuizService from "../../service/QuizService";
import {useEffect, useReducer, useState} from "react";
import QuizForm from "../../components/form/QuizForm";
import BackButton from "../../components/buttons/BackButton";

const UpdateQuiz = () => {
    let params = useParams();

    const initialQuizState = {
        id: null,
        title: ""
    }

    const [quiz, setQuiz] = useReducer(reducer, initialQuizState);
    const [isLoading, setLoading] = useState(true);
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    function reducer(prevState, nextState) {
        //merging the response from the API with the initial state to ensure field consistency
        nextState = {...prevState, ...nextState};
        return nextState;
    }

    const getQuiz = (id) => {
        QuizService.getQuiz(id, username, password).then(response => {
            setQuiz(response.data);
            setLoading(false);
        })
    }

    useEffect(() => {
        getQuiz(params.id)
    }, [params.id])

    return (
        <div className="container">
            <h1 className="main-heading"> Update Quiz: {quiz.title}</h1>
            {isLoading ? (
                <div>
                    <h4 className="text-center">
                        Loading...
                    </h4>
                </div>
            ) : (
                <>
                    <QuizForm initialState={quiz} from={"UpdateQuiz"}/>
                    <div className="buttons-group">
                        <BackButton/>
                    </div>
                </>

            )}
        </div>
    )
};

export default UpdateQuiz;

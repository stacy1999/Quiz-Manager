import "../pages.css"
import Card from "../../components/card/Card";
import QuizService from "../../service/QuizService";
import {useCallback, useEffect, useState} from "react";
import CreateQuizButton from "../../components/buttons/CreateQuizButton";

const Quizzes = () => {
    const [isQuizzesLoading, setQuizzesLoading] = useState(true);
    const [quizzes, setQuizzes] = useState([]);
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    const fetchQuizzes = useCallback(() => {
        QuizService.getAllQuizzes(username, password).then(response => {
            setQuizzes(response.data.map(
                quiz => ({
                    id: quiz.id,
                    title: quiz.title,
                })
            ));
            setQuizzesLoading(false);
        }).catch((e) => {
            console.log(e);
            setQuizzesLoading(false);

        });
    }, []);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    return (
        <div className="container">
            <h1 className="main-heading"> Quizzes </h1>
            {isQuizzesLoading ? (
                <div>
                    <h2 className="text-center">
                        Loading...
                    </h2>
                </div>
            ) : (
                <div className="row">
                    {quizzes.map((quiz) => {
                        return <Card key={quiz.id} quiz={quiz}/>
                    })}
                </div>
            )}
            <div className="buttons-group">
                <CreateQuizButton text={"Create new quiz"}/>
            </div>
        </div>
    )
}

export default Quizzes;

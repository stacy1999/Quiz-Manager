import ViewQuizzesButton from "../../components/buttons/ViewQuizzesButton";
import './Home.css'
import CreateQuizButton from "../../components/buttons/CreateQuizButton";

const Home = () => {
    return (
        <div className="main-container">
            <h1> Welcome to the Quiz Manager! </h1>
            <div className="row">
                <div className="col-md-12">
                    <div className="buttons-group">
                        <ViewQuizzesButton text={"View Quizzes"}/><CreateQuizButton text={"Create a quiz"}/>
                    </ div>
                </div>
            </div>
        </div>
    )
}

export default Home;

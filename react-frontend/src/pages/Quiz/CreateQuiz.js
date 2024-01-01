import "../pages.css"
import "../../components/form/QuizForm"
import QuizForm from "../../components/form/QuizForm";
import BackButton from "../../components/buttons/BackButton";

const CreateQuiz = () => {

    const initialQuizState = {
        id: null,
        title: ""
    }

    return (
        <div className="container">
            <h1 className="main-heading"> Create Quiz </h1>
            <QuizForm initialState={initialQuizState} from={"CreateQuiz"}/>
            <div className="buttons-group">
                <BackButton/>
            </div>
        </div>
    )
}
export default CreateQuiz;

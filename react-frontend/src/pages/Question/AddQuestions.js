import {useParams} from "react-router-dom";
import QuestionForm from "../../components/form/QuestionForm";
import BackButton from "../../components/buttons/BackButton";

const AddQuestions = () => {
    let params = useParams();

    const initialQuestionState = {
        id: null,
        questionTitle: "",
        quizId: params.id
    }

    return (
        <div className="container">
            <h1 className="main-heading"> Add Questions: </h1>
            <QuestionForm initialState={initialQuestionState} from={"CreateQuestion"}/>
            <div className="buttons-group">
                <BackButton/>
            </div>
        </div>
    )
}

export default AddQuestions

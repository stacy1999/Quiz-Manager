import {useParams} from "react-router-dom";
import AnswerForm from "../../components/form/AnswerForm";
import BackButton from "../../components/buttons/BackButton";

const AddAnswers = () => {
    let params = useParams();

    const initialAnswerState = {
        id: null,
        answer: "",
        questionId: params.id
    }

    return (
        <div className="container">
            <h1 className="main-heading"> Add Answers:</h1>
            <AnswerForm initialState={initialAnswerState} from={"CreateAnswer"}/>
            <div className="buttons-group">
                <BackButton/>
            </div>
        </div>
    )
}

export default AddAnswers

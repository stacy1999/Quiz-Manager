import {Link} from "react-router-dom";
import './buttonsStyle.css'

const AddQuestionsButton = (props) => {

    return (
        <Link to={"/addQuestions/" + props.quiz} className="button-primary">
            <span className="btn-text">{props.text}</span>
        </Link>
    )
};

export default AddQuestionsButton;

import {Link} from "react-router-dom";
import './buttonsStyle.css'

const UpdateQuizButton = (props) => {
    return (
        <Link to={"/updateQuiz/" + props.quiz.id} className="button-primary">
            <span className="btn-text">{props.text}</span>
        </Link>
    )
};

export default UpdateQuizButton;

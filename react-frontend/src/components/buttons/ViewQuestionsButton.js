import {Link} from "react-router-dom";
import './buttonsStyle.css'

const ViewQuestionsButton = (props) => {
    return (
        <Link to={"/quiz/" + props.quiz.id} className="button-primary">
            <span className="btn-text">{props.text}</span>
        </Link>
    )
};

export default ViewQuestionsButton;

import {Link} from "react-router-dom";
import './buttonsStyle.css'

const UpdateQuestionButton = (props) => {
    return (
        <Link to={"/updateQuestion/" + props.question} className="button-primary">
            <span className="btn-text">{props.text}</span>
        </Link>
    )
};

export default UpdateQuestionButton;

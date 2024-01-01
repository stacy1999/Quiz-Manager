import {Link} from "react-router-dom";
import './buttonsStyle.css'

const AddAnswersButton = (props) => {

    return (
        <Link to={"/addAnswers/" + props.question} className="button-primary">
            <span className="btn-text">{props.text}</span>
        </Link>
    )
};

export default AddAnswersButton;

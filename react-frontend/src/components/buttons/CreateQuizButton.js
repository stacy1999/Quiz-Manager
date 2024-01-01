import {Link} from "react-router-dom";
import './buttonsStyle.css'

const CreateQuizButton = (props) => {

    return (
        <Link to="/createQuiz" className="button-primary">
            <span className="btn-text">{props.text}</span>
        </Link>
    )
};

export default CreateQuizButton;

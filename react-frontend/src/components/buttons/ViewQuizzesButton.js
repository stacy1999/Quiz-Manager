import {Link} from "react-router-dom";
import './buttonsStyle.css'

const ViewQuizzesButton = (props) => {

    return (
        <Link to="/getAllQuizzes" className="button-primary">
            <span className="btn-text">{props.text}</span>
        </Link>
    )
};

export default ViewQuizzesButton;

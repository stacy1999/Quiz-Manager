import {Link} from "react-router-dom";

const ViewAnswersButton = (props) => {
    return (
        <Link to={"/question/" + props.question} className="button-primary">
            <span className="btn-text">{props.text}</span>
        </Link>
    )
};

export default ViewAnswersButton

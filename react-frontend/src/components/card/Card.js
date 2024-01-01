import "./Card.css"
import ViewQuestionsButton from "../buttons/ViewQuestionsButton";
import React from "react";

const Card = (props) => {
    return (
        <div className="card">
            <h1><b>{props.quiz.title}</b></h1>
            <ViewQuestionsButton text={"View Quiz"} quiz={props.quiz}/>
        </div>
    )
}

export default Card;

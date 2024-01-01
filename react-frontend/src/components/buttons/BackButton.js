import React from "react";
import {useNavigate} from "react-router-dom";
import './buttonsStyle.css'

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <button
            className="button-primary"
            onClick={() => navigate(-1)}>
            <span className="btn-text">Back</span>
        </button>
    )
};

export default BackButton;

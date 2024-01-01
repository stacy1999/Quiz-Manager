import TextInput from "../components/form/TextInput";
import React, {useState} from "react";
import BasicAuthService from "../service/BasicAuthService";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const initialState = {
        username: "",
        password: ""
    }

    const [user, setUser] = useState(initialState)
    const [isLoginFailed, setLoginFailed] = useState(false)
    const [isSuccessMessageShowing, setSuccessMessageShowing] = useState(false)

    const onChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    const resetForm = () => {
        setUser(initialState);
    }

    const login = (event) => {
        event.preventDefault();

        BasicAuthService.executeBasicAuthenticationService(user.username, user.password)
            .then(() => {
                setSuccessMessageShowing(true);
                setLoginFailed(false);
                localStorage.setItem("username", user.username)
                localStorage.setItem("password", user.password)
                localStorage.setItem("user", "true")
                navigate("/")
                resetForm()
            }).catch((e) => {
            console.log(e)
            setLoginFailed(true);
            setSuccessMessageShowing(false);
        })
    }

    return (
        <div className="container">
            {isLoginFailed && <div className="ui-icon-alert">Invalid Credentials</div>}
            {isSuccessMessageShowing && <div> Login Successful</div>}

            <div className="main-container">
                <h2>Please Log in: </h2>
                <form onSubmit={login}>
                    <TextInput type={"text"}
                               displayName={"Username"}
                               placeholder={"Username"}
                               fieldName={"username"}
                               value={user.username}
                               onChange={onChange}
                               className="text-input"/>
                    <br/>
                    <TextInput type={"password"}
                               displayName={"Password"}
                               placeholder={"Password"}
                               fieldName={"password"}
                               value={user.password}
                               onChange={onChange}
                               className="text-input"/>
                    <br/>
                    <input type="submit" value="Log In" className="button-primary"/>
                </form>
            </div>
        </div>
    )
}

export default Login

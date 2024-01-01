import axios from "axios";

const executeBasicAuthenticationService = (username, password) => {
    return axios.get("http://localhost:8080/basicAuth", {
        auth: {
            username: username,
            password: password,
        }
    })
}


const BasicAuthService = {
    executeBasicAuthenticationService
}

export default BasicAuthService;

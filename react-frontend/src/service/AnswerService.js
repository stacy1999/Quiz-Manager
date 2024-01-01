import axios from "axios";

const getAnswers = (id, username, password) => {
    return axios.get(`http://localhost:8080/answers/${id}`,
        { auth: {
                username: username,
                password: password,
            }})
}

const createAnswer = (data, username, password) => {
    return axios.post("http://localhost:8080/answers/", data,
        { auth: {
                username: username,
                password: password,
            }})
}

const AnswerService = {
    getAnswers, createAnswer
}

export default AnswerService

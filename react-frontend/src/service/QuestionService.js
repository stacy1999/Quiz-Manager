import axios from "axios";


const getQuestionById = (id, username, password) => {
    return axios.get(`http://localhost:8080/questions/question/${id}`,
        {
            auth: {
                username: username,
                password: password,
            }
        })
}

const getQuestionsByQuizId = (id, username, password) => {
    return axios.get(`http://localhost:8080/questions/${id}`,
        {
            auth: {
                username: username,
                password: password,
            }
        })
}

const createQuestion = (data, username, password) => {
    return axios.post("http://localhost:8080/questions/", data,
        {
            auth: {
                username: username,
                password: password,
            }
        })
}

const updateQuestion = (id, data, username, password) => {
    return axios.put(`http://localhost:8080/questions/${id}`, data, {
        auth: {
            username: username,
            password: password,
        }
    })
}

const QuestionService = {
    getQuestionsByQuizId, getQuestionById, createQuestion, updateQuestion
}

export default QuestionService

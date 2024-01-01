import axios from "axios";


const getAllQuizzes = (username, password) => {
    return axios.get("http://localhost:8080/quiz/",
        {
            auth: {
                username: username,
                password: password,
            }
        })

};

const getQuiz = (id, username, password) => {
    return axios.get(`http://localhost:8080/quiz/${id}`,
        {
            auth: {
                username: username,
                password: password,
            }
        })
}

const createQuiz = (data, username, password) => {
    return axios.post("http://localhost:8080/quiz/", data,
        {
            auth: {
                username: username,
                password: password,
            }
        })
}

const updateQuiz = (id, data, username, password) => {
    return axios.put(`http://localhost:8080/quiz/${id}`, data, {
        auth: {
            username: username,
            password: password,
        }
    })
}

const QuizService = {
    getAllQuizzes, getQuiz, createQuiz, updateQuiz
};

export default QuizService;

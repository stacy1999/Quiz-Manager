import {Link, useNavigate} from "react-router-dom";
import "./Navbar.css"

const {useLocation} = require("react-router-dom");
const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <div className="nav">
                <div className="nav-menu">
                    <Link to='/getAllQuizzes' className='nav-link' activeStyle> View Quizzes </Link>
                    <Link to='/createQuiz' className='nav-link'> Create Quiz</Link>
                    <Link to='/' className='nav-link'> Home </Link>
                </div>
                {
                    location.pathname !== '/login' && <div className="nav-button">
                        <button className='nav-btn-link' onClick={logout}>Log out</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Navbar;

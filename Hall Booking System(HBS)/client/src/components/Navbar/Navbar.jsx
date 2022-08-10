import "./Navbar.css"
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
    const navigate=useNavigate()
    const {user,dispatch}=useContext(AuthContext)
    //   console.log(user);
    const logout=()=>{
        localStorage.setItem("user", JSON.stringify(null)); 
        dispatch({type:"LOGOUT"})
        navigate("/")     
    }
    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo">
                    <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
                        HallBookingSystem
                    </Link>
                </span>
                {user? <div className="user"><span className="userName">{user.username} </span>
                    <button className="logoutBtn" onClick={logout}>Logout</button>
                </div>:  <div className="navItems">
                    <button className="navButton">
                        <Link to="/login" style={{color:"inherit",textDecoration:"none"}}>
                            Login
                        </Link>
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar
import  { useContext } from 'react'
import './Login.css'
import { useState } from 'react'
import {AuthContext} from "../../context/AuthContext"
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'


//in this don't refer that its my concept
const Login = () => {
   
    const navigate=useNavigate()
    const [credentials,setCredentials]=useState({
        email:"",
        password:""
    })
    const {user,loading,error,dispatch}=useContext(AuthContext)
    console.log([user,dispatch]);

    const handleChange=(e)=>{
        setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}))
    }

    const handleClick=async (e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
            const res=await axios.post("http://localhost:4000/api/auth/login",credentials)
            dispatch({type:"LOGIN_SUCCESS",payload:res?.data})
            if (res.data.isAdmin) {
                navigate("/admin")
            } else {
                navigate("/")
            }
            console.log();
        } catch (error) {
            // console.log(error.response.data.message);//in video the create separeate error in backend
            //but we are not use that way so we use this way
            dispatch({type:"LOGIN_FAILURE",payload:error.response.data.message})
        }
    }
    console.log(user);
    // console.log(error);
  return (
    <div className='login'>
        <div className="loginContainer">
            <h1 className="loginHeading">LOGIN</h1>
            { error && <span className="error">{error}</span>}
            <input type="email" id='email' placeholder='Email' style={{textTransform:"lowercase"}} className="loginInput" onChange={handleChange} required/>
            <input type="password" id="password" placeholder='password' className="loginInput" onChange={handleChange} required/>
            <button onClick={handleClick} disabled={loading} className='loginButton'>Login</button>
            <Link to="/changepassword"><p>Change password </p></Link> 
        </div>
    </div>
  )
}

export default Login
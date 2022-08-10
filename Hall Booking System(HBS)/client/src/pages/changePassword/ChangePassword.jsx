import './ChangePassword.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ChangePassword = () => {
    const navigate=useNavigate()
    const [newPassword,setNewPassword]=useState("")
    let getToken=JSON.parse(localStorage.getItem("user")) || null
    let token=getToken?.token;
    console.log(token);

    
    const handleClick=async (e)=>{
        // e.preventDefault()
        let res=await axios({
            method: 'put',
            url:"http://localhost:4000/api/auth/changePassword",
            data: {
                newpassword:newPassword 
            },
            headers: {
                accept: 'application/json',
                token:token
            }
        }).then(response=>{
            toast.success('Password Changed successfully!!!', {
                className:"toast-success",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(err=>{
            toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });})
        console.log(res)
    }
   
    return (
        <div className='login'>
            <div className="loginContainer">
                <h1 className="loginHeading">Change Password</h1>
                <input type="password" id="password" placeholder='password' className="loginInput" onChange={(e)=>setNewPassword(e.target.value)} required/>
                <button onClick={handleClick}  className='loginButton'>Change Password</button>  
                <ToastContainer />            
            </div>
        </div>
    )
}

export default ChangePassword;
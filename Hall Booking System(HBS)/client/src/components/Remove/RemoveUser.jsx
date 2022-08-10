import "./Remove.css"
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer,toast } from "react-toastify"

const RemoveUser = () => {
    const [email,setEmail]=useState("")

    const handleClick=async()=>{
        try {
            
            const res=await axios.delete("http://localhost:4000/api/auth/deleteUser",{email})
            .then(response=>{
                toast.success('Removed Staff successfully!!!', {
                    className:"toast-success",
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err=>{
                toast.error(err.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });})
            
            console.log(res);
        } catch (error) {
            console.log(error.message);
            
        }
    }
    
    return (
        <div className='removeContainer'>
            <div className="removeWrapper">
                <div className="removeForm">
                    <h1 className="removeHead">REMOVE STAFF</h1>
                    <span className="removeSpan">Email:</span>
                    <input className="removeInput" style={{textTransform:"lowercase"}} type="email" id="email" 
                        onChange={(e)=>setEmail(e.target.value)} required />
                    <button className='removeHallBtn' onClick={handleClick}>Remove Staff</button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default RemoveUser
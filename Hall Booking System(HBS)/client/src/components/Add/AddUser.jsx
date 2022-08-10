import "./Add.css"
import { useState } from 'react'
import axios from 'axios'
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const [credentials,setCredentials]=useState({
        name:"",
        department:"",
        email:"",
        password:""
    })
    // const [success,setSuccess]=useState(false)
    // const [error,setError]=useState("")

    const handleChange=(e)=>{
        setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}))
    }

    const handleClick=async()=>{
        try {
            
            const res=await axios.post("http://localhost:4000/api/auth",credentials)
            .then(response=>{
                toast.success('Staff added successfully!!!', {
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
                progress: undefined
            })})
            // setError("")
            // setSuccess(true)
            console.log(res);
        } catch (error) {
            console.log(error.message);
            // setSuccess(false)
            // setError(error.message)
        }
    }
    
    return (
        <div className='addContainer'>
            <div className="addWrapper">
                <div className="addForm">
                    <h1 className="addHead">ADD STAFF</h1>
                    <span className="addSpan">Name:</span>
                    <input className="addInput" type="text" id="name" onChange={handleChange} required />
                    <span className="addSpan">Department:</span>
                    <input className="addInput" type="text" id="department" onChange={handleChange} required />
                    <span className="addSpan">Email:</span>
                    <input className="addInput" style={{textTransform:"lowercase"}} type="email" id="email" onChange={handleChange} required />
                    <span className="addSpan">Password:</span>
                    <input className="addInput" type="password" id="password" onChange={handleChange} required />
                    <button className='addHallBtn' onClick={handleClick}>Add Staff</button>
                    <ToastContainer />
                    {/* {success && <span className="addSuccess">Staff Created Successfully</span>}
                    {error && <span className="addError">{error}</span>} */}
                </div>
            </div>
        </div>
    )
}

export default AddUser
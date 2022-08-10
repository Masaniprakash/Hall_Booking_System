import "./Add.css"
import { useState } from 'react'
import axios from 'axios'
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const AddHall = () => {
    const [hallName,setHallName]=useState("")
    // const [success,setSuccess]=useState(false)
    // const [error,setError]=useState("")

    const handleClick=async()=>{
        try {
            
            const res=await axios.post("http://localhost:4000/api/hall/",{name:hallName})
            .then(response=>{
                toast.success('Hall added successfully!!!', {
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
                    <h1 className="addHead">ADD HALL</h1>
                    <span className="addSpan">Hall Name:</span>
                    <input className="addInput" type="text" onChange={(e)=>setHallName(e.target.value)} required />
                    <button className='addHallBtn' onClick={handleClick}>Add Hall</button>
                    <ToastContainer />
                    {/* {success && <span className="addSuccess">Hall Created Successfully</span>}
                    {error && <span className="addError">{error}</span>} */}
                </div>
            </div>
        </div>
    )
}

export default AddHall
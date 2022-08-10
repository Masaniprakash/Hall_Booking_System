import "./Remove.css"
import { useState } from 'react'
import axios from 'axios'
import useFetch from "../../hooks/useFetch"
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const RemoveHall = () => {
    const [hall,setHall]=useState("")
    const {data}=useFetch("http://localhost:4000/api/hall/")

    const handleClick=async()=>{
        try {
            let getHall =data.find((item)=>item.name===hall)
            let id = getHall._id            
            const res=await axios.delete(`http://localhost:4000/api/hall/${id}`)
            .then(response=>{
                toast.success('Hall Removed successfully!!!', {
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
                    <h1 className="removeHead">REMOVE HALL</h1>
                    <span className="removeSpan">Select Hall Name:</span>
                    {data&&<select className="hall" onChange={(e)=>setHall(e.target.value)}>
                        <option ></option>
                        {data.map((item,index)=><option  key={index}>{item.name}</option>)}
                    </select>}
                    <button className='removeHallBtn' onClick={handleClick}>Remove Hall</button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default RemoveHall
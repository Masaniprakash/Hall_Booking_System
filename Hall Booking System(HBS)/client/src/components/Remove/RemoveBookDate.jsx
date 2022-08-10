import './Remove.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useFetch from "../../hooks/useFetch"
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const RemoveBookDate = () => {
    const [hallName,setHallName]=useState("")
    const [hallId,setHallId]=useState("")
    const [hourNumber,setHourNumber]=useState("")
    const [hourList,setHourList]=useState([])
    const [item,setItem]=useState([])
    const [date,setDate]=useState("")


    useEffect(()=>{
        hourList?.map((item)=>{
            return (item?.hourNumbers.find((hour)=>{
                if( hour?.number===parseInt(hourNumber)){
                    setItem(item)
                }
                return item 
            }))
        }) 
    },[hourList,hourNumber])

    console.log(item._id)

    useEffect(()=>{
        let fetch=async()=>{
            let res=await axios.post("http://localhost:4000/api/hall/find",{name:hallName})
            // console.log(res.data?._id)
            setHallId(res.data?._id)
        }
        fetch()
    },[hallName])

    useEffect(()=>{
        
        let fetch=async()=>{
            let res=await axios.get(`http://localhost:4000/api/hall/getHallHours/${hallId}`)
            // console.log(res.data)
            setHourList(res.data)          
        }
        fetch()
        
    },[hallId])

    const {data}=useFetch("http://localhost:4000/api/hall/")

    const handleClick=async()=>{
        try {
            await axios.put(`http://localhost:4000/api/hours/deleteavailability/${item._id}`,{dates:date})
            .then(response=>{
                toast.success('Booked Date Removed successfully!!!', {
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
        } catch (error) {
            console.log(error.message);
        }
    }

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() ).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    
    return (
        <div className='removeContainer'>
            <div className="removeWrapper">
                <div className="removeForm">
                    <h1 className="removeHead">REMOVE BOOKED DATES</h1>
                    <span className="removeSpan">Select Hall Name:</span>
                    {data&&<select className="hall" onChange={(e)=>setHallName(e.target.value)}>
                        <option ></option>
                        {data.map((item,index)=><option  key={index}>{item.name}</option>)}
                    </select>}  
                    <span className="removeSpan">Select Hours No:</span>
                    <select className="hall" onChange={(e)=>setHourNumber(e.target.value)}>
                        <option ></option>
                        {hourList.map((item)=> item.hourNumbers.map((hour,index)=>(
                                <option  key={index}>{hour.number}</option>
                            ))
                        )}
                    </select>
                    <span className="removeSpan">Select The Date:</span>
                    <input type="date" className='dateInput' min={disablePastDate()} 
                        onChange={(e)=>setDate(e.target.value)}
                    />
                    <button className='removeHallBtn' onClick={handleClick}>Remove Booked Date</button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default RemoveBookDate
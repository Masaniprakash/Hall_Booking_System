import "./Remove.css"
import {  useState } from 'react'
// import axios from 'axios'
import useFetch from "../../hooks/useFetch"

const RemovePeriod = () => {
    const [hall,setHall]=useState("")
    const [period,setPeriod]=useState()
    const [success,setSuccess]=useState(false)
    const [error,setError]=useState("")
    console.log(hall);
    const {data}=useFetch("http://localhost:4000/api/hall/")
    console.log(data);
    console.log(period);

    

    const handleClick=async()=>{
        try {
            let getHall =data.find((item)=>item.name===hall)
            console.log(getHall.hours);
            console.log("getHall.hours");
            let id = getHall._id
            console.log(id);
            // let body={hourNumbers:[{number:period}]}
            // await axios.post(`http://localhost:4000/api/hours/${id}`,body)
            // setError("")
            // setSuccess(true)
            // console.log(res);
        } catch (error) {
            console.log(error.message);
            setSuccess(false)
            setError(error.message)
        }
    }

    const handleClickRemove=async ()=>{

    }
    
    return (
        <div className='removeContainer'>
            <div className="removeWrapper">
                <div className="removeForm">
                    <h1 className="removeHead">REMOVE PERIOD</h1>
                    <span className="removeSpan">Select The Hall:</span>
                    {data&&<select className="hall" onChange={(e)=>setHall(e.target.value)}>
                        <option ></option>
                        {data.map((item,index)=><option  key={index}>{item.name}</option>)}
                    </select>}
                    <button className='removeHallBtn' onClick={handleClick}>Search</button>
                    <span className="removeSpan">Peroid No:</span>
                    <input className="removeInput" type="number" onChange={(e)=>setPeriod(e.target.value)} required />
                    <button className='removeHallBtn' onClick={handleClickRemove}>Remove Period</button>
                    {success && <span className="removeSuccess">Hall Created Successfully</span>}
                    {error && <span className="removeError">{error}</span>}
                </div>
            </div>
        </div>
    )
}

export default RemovePeriod
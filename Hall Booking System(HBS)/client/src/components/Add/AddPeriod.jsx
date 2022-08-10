import "./Add.css"
import {  useState } from 'react'
import axios from 'axios'
import useFetch from "../../hooks/useFetch"
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const AddPeriod = () => {
    const [hall,setHall]=useState("")
    const [period,setPeriod]=useState()
    const [periodAll,setPeriodAll]=useState([])
    console.log(hall);
    const {data}=useFetch("http://localhost:4000/api/hall/")
    console.log(data);
    console.log(period);

    console.log(periodAll.map((item,index)=>console.log(item)));
    const handleClick=async()=>{
        setPeriodAll([
            {hourNumbers:[{number:1}]}, 
            {hourNumbers:[{number:2}]}, 
            {hourNumbers:[{number:3}]}, 
            {hourNumbers:[{number:4}]}, 
            {hourNumbers:[{number:5}]}, 
            {hourNumbers:[{number:6}]}, 
            {hourNumbers:[{number:7}]} 
        ])
        try {
            let getHall =data.find((item)=>item.name===hall)
            let id = getHall._id
            console.log(id);
            let body={hourNumbers:[{number:period}]}
            periodAll.map(async(item)=>{
                console.log(item);
                await axios.post(`http://localhost:4000/api/hours/${id}`,item)
            })
            
            .then(response=>{
                toast.success('Period add successfully!!!', {
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
            // setError("")
            // setSuccess(true)
            // console.log(res);
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
                    <h1 className="addHead">ADD PERIOD</h1>
                    <span className="addSpan">Select The Hall:</span>
                    {data&&<select className="hall" onChange={(e)=>setHall(e.target.value)}>
                        <option ></option>
                        {data.map((item,index)=><option  key={index}>{item.name}</option>)}
                    </select>}
                    <span className="addSpan">Peroid No:</span>
                    <input className="addInput" type="number" onChange={(e)=>setPeriod(e.target.value)} required />
                    <button className='addHallBtn' onClick={handleClick}>Add Period</button>
                    <ToastContainer />
                    {/* {success && <span className="addSuccess">Hall Created Successfully</span>}
                    {error && <span className="addError">{error}</span>} */}
                </div>
            </div>
        </div>
    )
}

export default AddPeriod
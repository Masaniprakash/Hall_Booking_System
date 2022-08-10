import { useState } from 'react'
import AddHall from '../../components/Add/AddHall'
import AddPeriod from '../../components/Add/AddPeriod'
import AddUser from '../../components/Add/AddUser'
import Navbar from '../../components/Navbar/Navbar'
import RemoveBookDate from '../../components/Remove/RemoveBookDate'
import RemoveHall from '../../components/Remove/RemoveHall'
import RemoveUser from '../../components/Remove/RemoveUser'
import './Admin.css'

const Admin = () => {
    const [action,setAction]=useState("addUser")
    console.log(action);
    return (
        <div className='admin'>
            <Navbar />
            <div className="adminContainer">
                <div className="adminWrapper">
                    <div className="adminButton">
                        <button className='AdminAddUser' id='AdminAddUser' value="addUser"
                            onClick={(e)=>setAction(e.target.value)}
                        >
                            Add User                       
                        </button>
                        <button className='AdminAddHall' value="addHall"
                            onClick={(e)=>setAction(e.target.value)}
                        >
                            Add Hall
                        </button>
                        <button className='AdminAddPeriod' value="addPeriod"
                            onClick={(e)=>setAction(e.target.value)}
                        >Add Period</button>
                        <button className='AdminDeleteUser' value="deleteUser" 
                            onClick={(e)=>setAction(e.target.value)}
                        >
                            Delete User
                        </button>
                        <button className='AdminDeleteHall' value="deleteHall" 
                            onClick={(e)=>setAction(e.target.value)}
                        >
                            Delete Hall
                        </button>
                        <button className='AdminDeleteBooked' value="deleteBookedDate" 
                            onClick={(e)=>setAction(e.target.value)}
                        >
                            Delete Booked Date
                        </button>
                    </div>
                </div>
            </div>
            {action==="addUser" ? <AddUser/>:null}
            {action==="deleteUser" ? <RemoveUser/>:null}
            {action==="addHall" ? <AddHall/>:null}
            {action==="deleteHall" ? <RemoveHall/>:null}
            {action==="addPeriod" ? <AddPeriod/>:null}
            {action==="deleteBookedDate" ? <RemoveBookDate/>:null}
        </div>
    )
}

export default Admin
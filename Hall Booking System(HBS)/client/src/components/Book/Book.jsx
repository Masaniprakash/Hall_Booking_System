import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { useState } from "react"
import HallContext from "../../context/HallContext"
import useFetch from '../../hooks/useFetch'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import "./Book.css"

const Reserve = ({setOpen,hallId}) => {
    const {data}=useFetch(`http://localhost:4000/api/hall/getHallHours/${hallId}`)
    console.log(data);
    
    console.log(hallId);
    const [selectedHours,setSelectedHours]=useState([])

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        // console.log(checked);//if checket it true uncheck false
        console.log(value);
        setSelectedHours(
            checked
            ? [...selectedHours, value]
            : selectedHours.filter((item) => item !== value)//its unchecked to remove the id
        );
    };
    console.log(selectedHours);

    let context=useContext(HallContext)
    //to get date
    
    console.log(context);
    let dates=context.search.date
    let dateArray=[]
    let getTimeDate=new Date(dates).getTime()
    dateArray.push(getTimeDate)
    // dateArray.push(getTimeDate)
    console.log(dateArray);
    console.log(dates);
    console.log(getTimeDate);
    const isAvailable = (hoursNumber) => {
        const isFound = hoursNumber.unavailableDates
        .some((item)=>dateArray.includes(new Date(item.date)?.getTime()))
        return !isFound;
    };
    const isAvailableName = (hoursNumber) => {
        const isFound = hoursNumber.unavailableDates.some((item)=>dateArray.includes(new Date(item.date)?.getTime()))
        const isFou = hoursNumber.unavailableDates.find((item)=>dateArray.includes(new Date(item.date)?.getTime()))
        if(isFound){
            return isFou.name;
        }
    };

    

    const navigate = useNavigate();

    let getUser=JSON.parse(localStorage.getItem("user")) || null
    let getName=getUser?.name;
    let getDept=getUser?.department
    // console.log(admin);

    const handleClick = async () => {
        try {
            if(getUser===null){
                return navigate("/login")
            }else{
                console.log(dates);
                let userName=`${getName}(${getDept})`
                await Promise.all(
                    selectedHours.map((hourId) => {
                    const res = axios.put(`http://localhost:4000/api/hours/availability/${hourId}`, {
                        date:getTimeDate,name:userName
                    });
                    console.log(res.data);

                    let today = new Date();
                    let dd = today.getDate()-1;//-1 is for to get previous date
                    let mm = today.getMonth()+1; 
                    let yyyy = today.getFullYear();
                    if(dd<10) dd='0'+dd; //because less 10 value add 0 in front
                    if(mm<10) mm='0'+mm;
                    today = yyyy+'-'+mm+'-'+dd;
                    console.log(today);
                    const delThePastUnava= axios.put(`http://localhost:4000/api/hours/deleteThePast/${hourId}`, {
                        dates: today,
                    });
                    console.log(delThePastUnava);
                    return res.data;
                    })
                );
            }
            // setOpen(false);
            // navigate("/");
        } catch (err) {}
    };

    const adminDelete=()=>{

    }

    return (
        <div className="reserve">
            <div className="reserveContainer">
                
                <FontAwesomeIcon  icon={faCircleXmark} className="reserveClose" onClick={ ()=>setOpen(false)} />
                <span>Select the Hours:</span>
                {data?.map((item,index)=>(
                    <div className="reserveItem" key={index}>
                        {item?.hourNumbers?.map((hourNo,index)=>(
                            <div className="room" key={index}>
                                <label style={{marginTop:"7px"}}>{hourNo?.number}</label>
                                <input type="checkbox" 
                                    value={hourNo?._id} 
                                    disabled={!isAvailable(hourNo)} 
                                    onChange={handleSelect}
                                />
                                <p>{isAvailableName(hourNo)}</p>
                            </div>
                        ))}
                        
                    </div>
                ))}
                <button className="reserveButton" onClick={handleClick}>Reserve Now!</button>
                
            </div>
        </div>
    )
}

export default Reserve
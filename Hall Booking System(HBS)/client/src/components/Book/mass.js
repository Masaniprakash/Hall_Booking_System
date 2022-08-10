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
        // console.log(value);
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
    let getTimeDate=dates
    dateArray.push(getTimeDate)
    console.log(dateArray);
    console.log(dates);
    console.log(getTimeDate);
    const isAvailable = (hoursNumber) => {
        const isFound = hoursNumber.unavailableDates.some((date) => dateArray.includes(date.split("/")[0]));
        return !isFound;
    };
    const isAvailableName = (hoursNumber) => {
        const isFound = hoursNumber.unavailableDates.find((date) => dateArray.includes(date.split("/")[0]));
        console.log(isFound);
        console.log(typeof isFound);
        let splitName=isFound?.split("/")[1]
        console.log(splitName);
        return splitName;
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
                let dateAndUserName=`${getTimeDate}/${getName}(${getDept})`
                await Promise.all(
                    selectedHours.map((hourId) => {
                    const res = axios.put(`http://localhost:4000/api/hours/availability/${hourId}`, {
                        dates: dateAndUserName,
                    });
                    console.log(res.data);

                    // let today = new Date();
                    // let dd = today.getDate()-1;//-1 is for to get previous date
                    // let mm = today.getMonth()+1; 
                    // let yyyy = today.getFullYear();
                    // if(dd<10) dd='0'+dd; //because less 10 value add 0 in front
                    // if(mm<10) mm='0'+mm;
                    // today = yyyy+'-'+mm+'-'+dd;
                    // console.log(today);
                    // const delThePastUnava= axios.put(`http://localhost:4000/api/hours/deleteThePast/${hourId}`, {
                    //     dates: today,
                    // });
                    // console.log(delThePastUnava);
                    return res.data;
                    })
                );
            }
            // setOpen(false);
            // navigate("/");
        } catch (err) {}
    };

    return (
        <div className="reserve">
            <div className="reserveContainer">
                
                <FontAwesomeIcon  icon={faCircleXmark} className="reserveClose" onClick={ ()=>setOpen(false)} />
                <span>Select the Hours:</span>
                {data?.map((item,index)=>(
                    <div className="reserveItem" key={index}>
                        {item?.hourNumbers?.map((roomNo,index)=>(
                            <div className="room" key={index}>
                                <label style={{marginTop:"7px"}}>{roomNo?.number}</label>
                                <input type="checkbox" 
                                    value={roomNo?._id} 
                                    disabled={!isAvailable(roomNo)} 
                                    onChange={handleSelect}
                                />
                                <p>{isAvailableName(roomNo)}</p>
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
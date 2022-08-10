import './Hall.css'
import { useState ,useContext} from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import si from "../../images/resort.jpg"
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Book from '../../components/Book/Book'
import HallContext from "../../context/HallContext"

const Hall = () => {
    const [openModal,setOpenModal]=useState(false)
    const [date,setDate]=useState(undefined)
    console.log(date);
    console.log(typeof date);

    const location=useLocation()
    //{pathname: '/hotels/62cd3e326369834f9b31e9d2', search: '', hash: '', state: null, key: 'sovke39w'}
    // we want id split path as /
    let split=location.pathname.split("/")
    // console.log(split);//['', 'hotels', '62cd3e326369834f9b31e9d2'] we take the last one 
    let iNo=split.length-1
    // console.log(iNo);//ino=3 -1 = 2 so inois 2 we take the last one 
    const id=split[iNo]
    // console.log(id);

    const {data}=useFetch(`http://localhost:4000/api/hall/find/${id}`)

    console.log(data)

    let context=useContext(HallContext)
    // const contextPush={date}
    // console.log(typeof date);
    const handleSearch=()=>{
        if (date===undefined) {
            alert("please select the date")
        } else {
            setOpenModal(true);
            context.search.date=date
            console.log(context.search.date);
        }
    }
    // const disablePastDate = () => {
    //     const today = new Date();
    //     const dd = String(today.getDate() ).padStart(2, "0");
    //     const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    //     const yyyy = today.getFullYear();
    //     return yyyy + "-" + mm + "-" + dd;
    // };
    
    return (
        <div>
            <Navbar />
            <div className="hallContainer">
                <div className="hallWrapper">
                    <h1>{data?.name}</h1>
                    <div className="imgContainer">
                        <img src={si} alt="" className='img' />
                    </div>
                    <div className="select">
                        <input type="date" className='date'  onChange={(e)=>setDate(e.target.value)}/>
                        <button className='bookNow' onClick={handleSearch} >Book Now!</button>
                    </div>
                </div>
                {openModal && <Book setOpen={setOpenModal} hallId={id}/>}
            </div>
            <Footer />
        </div>
    )
}

export default Hall
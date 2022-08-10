// import Feature from "../../components/Feature/Feature"
// import FeatureProperty from "../../components/FeatureProperty/FeatureProperty"
import Footer from "../../components/Footer/Footer"
// import Header from "../../components/Header/Header"
// import MailList from "../../components/MailList/MailList"
import Navbar from "../../components/Navbar/Navbar"
import useFetch from "../../hooks/useFetch"
// import PropertyList from "../../components/probertyList/PropertyList"
import "./Home.css"
import si from "../../images/searchItem.webp"
import { Link } from "react-router-dom"

const Home = () => {
    const {data,loading}=useFetch(`http://localhost:4000/api/hall/`)
    console.log(data);
    return (
        <div>
            <Navbar />
            <div className="homeContainer">
                <h1 className="homeTitle">Select the hall</h1>
                {loading?"loading please wait":<>{data.map((item,index)=>(
                    <div className='searchItem' key={index}>
                        <img src={si} alt="" className="siImg" />
                        <div className="siDesc">
                            <h1 className="siTitle">{item.name}</h1>
                            <Link to={`/halls/${item._id}`}>
                                <button className='siCheckButton'>See availability</button>
                            </Link>
                        </div>
                    </div>))}
                </>}
            </div>
            <Footer />
        </div>
    )
}

export default Home
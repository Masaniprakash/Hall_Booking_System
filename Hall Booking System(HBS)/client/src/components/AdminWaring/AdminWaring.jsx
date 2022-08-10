import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import {faWarning} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AdminWaring = () => {
  return (
      <div className="aW">
        <Navbar />
        <div className="aWWrapp">
            <div className="awContainer">
            <FontAwesomeIcon icon={faWarning} />
                <h2>You are not admin or refresh page</h2>
                <h3>Go back</h3>
                <Link to="/" ><button>Home</button></Link>
            </div>
        </div>
        
    </div>
  )
}

export default AdminWaring
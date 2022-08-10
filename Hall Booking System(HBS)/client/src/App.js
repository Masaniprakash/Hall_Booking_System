import './App.css';
import { useState } from 'react';
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Home from './pages/Home/Home';
import HallContext from './context/HallContext';
import Login from './pages/Login/Login';
import Hall from './pages/Hall/Hall';
import { AuthContextProvider } from './context/AuthContext';
import Admin from './pages/Admin/Admin';
import AdminWaring from './components/AdminWaring/AdminWaring';
import ChangePassword from './pages/changePassword/ChangePassword';
function App() {
    const [refresh,setRefresh]=useState(false)
    let getAdmin=JSON.parse(localStorage.getItem("user")) || null
    let admin=getAdmin?.isAdmin;
    console.log(admin);
    return (
        <div className="App">   
            <AuthContextProvider>
                <HallContext.Provider value={{search:{date:""}}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/halls/:id" element={<Hall />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/changePassword" element={<ChangePassword />} />
                            {admin ? <Route path="/admin" element={<Admin />} />:
                            <Route path="/admin" element={<AdminWaring />} />}
                            {admin ? ()=>setRefresh(!refresh):null}
                        </Routes>
                    </BrowserRouter>
                </HallContext.Provider>
            </AuthContextProvider>
        </div>
    );
}

export default App;

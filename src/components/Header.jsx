import { Link } from "react-router-dom"
import '../styles/Header.scss'
import { setAuth } from "../store/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProtectedRoutes from "../Middleware/ProtectedRoutes";

function Header() {

    let protectedRoutes = ProtectedRoutes()

    const [token, setToken] = React.useState("")    
    const [currentUser, setCurrentUser] = React.useState()
    console.log(currentUser)
    const dispatch = useDispatch()
    let tokenInternal = useSelector(state => state.auth.token)
    let currentUserInternal = useSelector(state => state.curentUserInfo.curentUserInfo)
    let navigate = useNavigate();
    console.log(currentUserInternal)

    const Disconect = () => {
        if (tokenInternal !== "") {
            dispatch(setAuth(""))
            navigate("/auth")
        }
    }

    useEffect(() => {
        setToken(tokenInternal)
        setCurrentUser(currentUserInternal)
    }, [tokenInternal, currentUserInternal])


    return (
        <header>
            <nav className="Header" >
                <div>
                    <p><Link to="/" >Home</Link></p>
                </div>
                <div>
                    <p><Link to="/UserList" >User List</Link></p>
                    <p><Link to="/Auth" >Login</Link></p>
                    <p><Link to="/Groupe" >Groupe</Link></p>
                    {token !== "" ? <>
                        <p onClick={() => Disconect()}>Disconect</p>
                        <Link to="/Profile"></Link>
                    </>
                        : <></>
                    }    
                </div>
            </nav>

     
        </header>
    )
}

export default Header
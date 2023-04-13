import { Link } from "react-router-dom"
import '../styles/Header.scss'
import { setAuth } from "../store/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Header() {

    const [token, setToken] = React.useState("")
    const dispatch = useDispatch()
    let tokenInternal = useSelector(state => state.auth.token)
    let navigate = useNavigate();

    const Disconect = () => {
        console.log('setAuth')
        // tokenInternal = useSelector(state => state.auth.token)
        if (tokenInternal !== "") {
            dispatch(setAuth(""))
            // setToken("")
            navigate("/auth")
        }
    }

    useEffect(() => {
        setToken(tokenInternal)
    }, [tokenInternal])


    return (
        <header>
            <nav className="Header" >
                <div>
                    <p><Link to="/" >Home</Link></p>
                    <p><Link to="/UserList" >User List</Link></p>
                </div>
                <div>
                    {token !== "" ?
                        <p onClick={() => Disconect()}>Disconect</p>
                        : <></>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header
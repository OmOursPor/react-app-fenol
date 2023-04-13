import { Link } from "react-router-dom"
import '../styles/Header.scss'
import { setAuth } from "../store/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';

function Header() {

    const [token, setToken] = React.useState("")
    const dispatch = useDispatch()
    let tokenInternal = useSelector(state => state.auth.token)
    console.log(tokenInternal)

    const Disconect = () => {
        tokenInternal = useSelector(state => state.auth.token)
        if(token !== ""){
            dispatch(setAuth(""))
            setToken("")
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
                    <p><Link to="/CreateUser" >Create user</Link></p>
                    <p><Link to="/auth" >Login</Link></p>
                    {token !== "" ?
                        <p><Link onClick={() => Disconect} to="/auth">Disconect</Link></p>
                        : <></>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header
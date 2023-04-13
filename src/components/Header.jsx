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
        if (token !== "") {
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

                </div>
                <div>
                    {token !== "" ?
                        <p><Link onClick={() => Disconect} to="/auth">Disconect</Link></p>
                        :
                        <div>
                            <p><Link to="/UserList" >User List</Link></p>
                            <p><Link to="/auth" >Login</Link></p>
                            <p><Link to="/CreateUser" >Register</Link></p>
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header
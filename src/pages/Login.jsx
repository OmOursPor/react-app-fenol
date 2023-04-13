import { TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from 'react';
import '../styles/Login.scss'
import { setAuth } from "../store/reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const [loginData, setLoginData] = useState({"email": "", "password": ""})
    
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const auth = () => {
        axios.post('http://82.65.6.187:8002/auth', {
            email: loginData.email,
            password: loginData.password
          })
          .then(function (response) {
            console.log("connected")
            dispatch(setAuth(response.data.token))
            navigate("/");
          })
          .catch(function (error) {
            console.log(error.message);
          });
    }

    return (
        <section className="Login">
            <TextField variant="outlined" label="email" type="email" value={loginData.email} onChange={(event) => setLoginData({...loginData, "email": event.target.value})} />
            <TextField variant="outlined" label="password" type="password" value={loginData.password} onChange={(event) => setLoginData({...loginData, "password": event.target.value})} />

            <Button variant="outlined" type="button" onClick={auth}> Créer utilisateur </Button>
        </section>
    )
}
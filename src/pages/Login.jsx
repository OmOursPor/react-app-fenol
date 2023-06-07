import { TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import '../styles/Login.scss'
import { setAuth } from "../store/reducers/auth";
import { setCurrentUserInfo } from "../store/reducers/currentUserInfo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  
    const [loginData, setLoginData] = useState({"email": "", "password": ""})
    const [currentUser, setCurrentUser] = useState({"id": 0, "email": "", "nickename": ""})
    
    const dispatch = useDispatch()
    let navigate = useNavigate();
    
    const auth = () => {
        axios.post(`${window.baseUrl}auth`, {
            email: loginData.email,
            password: loginData.password
          })
          .then(function (response) {
            console.log("connected")
            dispatch(setAuth(response.data.token))
            dispatchCurrentUser()
            navigate("/");
          })
          .catch(function (error) {
            toast.error('Erreur de permission');
            console.log(error.message);
          });
    }

    const dispatchCurrentUser = async () => {
      let response = await axios.get(`${window.baseUrl}api/users/192`).then(response => response.data)
      let currentUserInternal = {id: response.id, email: response.email, nickname: response.nickname}
      dispatch(setCurrentUserInfo(currentUserInternal))
    }

    useEffect(() => {
      if(currentUser.id !== 0)
        dispatch(setCurrentUserInfo(currentUser))
    }, [currentUser])

    return (
        <section className="Login">
            <TextField variant="outlined" label="email" type="email" value={loginData.email} onChange={(event) => setLoginData({...loginData, "email": event.target.value})} />
            <TextField variant="outlined" label="password" type="password" value={loginData.password} onChange={(event) => setLoginData({...loginData, "password": event.target.value})} />

            <Button variant="outlined" type="button" onClick={auth}> Connexion </Button>
            <ToastContainer />
        </section>
    )
}
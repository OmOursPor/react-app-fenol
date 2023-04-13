import { TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from 'react';
import '../styles/CreateUser.scss'

export default function CreateUser() {

    const [user, setUser] = useState({email: "", plainPassword: "", nickname: ""})    
    
    

    const post = () => {
        axios.post('http://82.65.6.187:8002/api/users', {
            email: user.email,
            plainPassword: user.plainPassword,
            nickname: user.nickname
          })
          .then(function (response) {
            console.log(response.data.id);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

       
    
    
    return (
        <section className="CreateUser">
            <TextField variant="outlined" label="nickname" type="text" value={user.nickname} onChange={(event) => setUser({...user, "nickname": event.target.value})} />
            <TextField variant="outlined" label="password" type="password" value={user.plainPassword} onChange={(event) => setUser({...user, "plainPassword": event.target.value})} />
            <TextField variant="outlined" label="email" type="email" value={user.email} onChange={(event) => setUser({...user, "email": event.target.value})} />

            <Button variant="outlined" type="button" onClick={post}> Créer utilisateur </Button>
        </section>    
    )
}
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from 'react';
import axios from "axios";
import "../styles/Groupe.scss"
import { useNavigate } from "react-router-dom";

export default function Groupe() {

    const [newGroupeData, setNewGroupeData] = useState({"name": "", "description": ""})
    const dispatch = useDispatch()
    let tokenInternal = useSelector(state => state.auth.token);
    let navigate = useNavigate();

    const createGroupe = () => {
        axios.post('http://82.65.6.187:8002/api/groups', {
            name: newGroupeData.name,
            description: newGroupeData.description
          }, { headers: {
            Authorization: `Bearer ${tokenInternal}`
          }})
          .then(function (response) {
            console.log("Groupe created")
            navigate("/");
          })
          .catch(function (error) {
            console.log(error.message);
          });
    }

    return(
        <section className="Groupe">
            <TextField variant="outlined" label="Name" type="email" value={newGroupeData.name} onChange={(event) => setNewGroupeData({...newGroupeData, "name": event.target.value})} />
            <TextField variant="outlined" label="Description" type="texte" value={newGroupeData.description} onChange={(event) => setNewGroupeData({...newGroupeData, "description": event.target.value})} />

            <Button variant="outlined" type="button" onClick={createGroupe}> Créer un groupe </Button>
        </section>
    )
}
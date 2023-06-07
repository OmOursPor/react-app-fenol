import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import "../styles/Groupe.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GroupeRequest() {
    
    let tokenInternal = useSelector(state => state.auth.token);
    
    const getGroupeRequest = () => {
        axios.post(`${window.baseUrl}/api/groups/${tokenInternal}/requests`, { headers: {
          Authorization: `Bearer ${tokenInternal}`
        }})
        .then(function (response) {
          console.log(response)
          toast.success("Demande envoyer avec success");
        })
        .catch(function (error) {
          toast.error("Erreur lors de l'envoie de la demande");
          console.log(error.message);
        });
    }

    return(


        <div className="GroupeRequest">
            <h3>Demande d'insertion à votre groupe : </h3>

        </div>
    )
}
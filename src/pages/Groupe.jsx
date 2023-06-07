import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../styles/Groupe.scss"
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GroupeRequest from "../components/GroupeRequest";

export default function Groupe() {

    const [newGroupeData, setNewGroupeData] = useState({"name": "", "description": ""})
    const [groups, setGroups] = useState()    
    const [users, setUsers] = useState() 
    const [currentGroup, setCurrentGroup] = useState({"@id": "", "@type": "", "name": "", "owner": "", "description": ""})

    let tokenInternal = useSelector(state => state.auth.token);
    let navigate = useNavigate();



    // gérer la popUp create BEGIN
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleOpenCreateModal = () => {
      setIsCreateOpen(true);
    }

    const handleCloseCreateModal = () => {
      setIsCreateOpen(false);
    }
    // gérer la popUp create END

    // gérer la popUp create BEGIN
    const [isJoinOpen, setIsJoinOpen] = useState(false);

    const handleOpenJoinModal = (group) => {
      setIsJoinOpen(true);
      setCurrentGroup(group)
    }

    const handleCloseJoinModal = () => {
      setIsJoinOpen(false);
    }
    // gérer la popUp create END

    // gérer la popUp groupe request BEGIN
    const [isGroupeRequestOpen, setIsGroupeRequestOpen] = useState(false);

    const handleOpenGroupeRequestModal = () => {
      setIsGroupeRequestOpen(true);
    }

    const handleCloseGroupeRequestModal = () => {
      setIsGroupeRequestOpen(false);
    }
    // gérer la popUp groupe request END

    const createGroupe = () => {
        axios.post(`${window.baseUrl}/api/groups`, {
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

    const joinGroup = (targetGroup) => {
      axios.post(`${window.baseUrl}/api/group_requests`, {
        targetGroup: targetGroup
      }, { headers: {
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
      handleCloseJoinModal()
    }

    useEffect(() => {
      axios.get(`${window.baseUrl}api/groups`)
        .then(function (response) {
          setGroups(response.data["hydra:member"])
          console.log(response.data["hydra:member"])
        })
    }, [setGroups])

    return(
      <>
        <section className="Groupe">
            <div>
              <Button variant="outlined" type="button" onClick={handleOpenCreateModal}> Créer un groupe </Button>
              <Button variant="outlined" type="button" onClick={handleOpenGroupeRequestModal}> Demande de groupe </Button>
            </div>
            <TableContainer
            variant="outlined"
            >
            <Table aria-label="groups list">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {groups?.map((group, i) => 
                <TableRow key={"groupRow"+i} onClick={() => handleOpenJoinModal(group)}>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.description}</TableCell>
                </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
        </section>



        <ReactModal
          isOpen={isCreateOpen}
          className="GroupeModal"
          onRequestClose={handleCloseCreateModal}
          contentLabel="Create group"
          appElement={document.getElementById('root')}>
            <div className="CreateGroup">
              <h3>Créer votre groupe</h3>
              <TextField variant="outlined" label="Name" type="email" value={newGroupeData.name} onChange={(event) => setNewGroupeData({...newGroupeData, "name": event.target.value})} />
              <TextField variant="outlined" label="Description" type="texte" value={newGroupeData.description} onChange={(event) => setNewGroupeData({...newGroupeData, "description": event.target.value})} />

              <Button variant="outlined" type="button" onClick={createGroupe}> Créer un groupe </Button>
            </div>
        </ReactModal>    

        {/* Modale créer un groupe */}
        <ReactModal
          isOpen={isJoinOpen}
          className="GroupeModal"
          onRequestClose={handleCloseJoinModal}
          contentLabel="Join group"
          appElement={document.getElementById('root')}>
            <div className="JoinGroup">
              <h3>Rejoindre ce groupe</h3>
              
              <p>Nom du groupe : <strong>{currentGroup.name}</strong></p>
              <p>Description du groupe : <strong>{currentGroup.description}</strong></p>
              <p>Chef du groupe : <strong>{currentGroup.owner}</strong></p>
              
              <Button variant="outlined" type="button" onClick={() => joinGroup(currentGroup["@id"])}> Rejoindre le group </Button>
            </div>
        </ReactModal>    

        {/* Modale rejoindre un groupe */}
        <ReactModal
          isOpen={isJoinOpen}
          className="GroupeModal"
          onRequestClose={handleCloseJoinModal}
          contentLabel="Join group"
          appElement={document.getElementById('root')}>
            <div className="JoinGroup">
              <h3>Rejoindre ce groupe</h3>
              
              <p>Nom du groupe : <strong>{currentGroup.name}</strong></p>
              <p>Description du groupe : <strong>{currentGroup.description}</strong></p>
              <p>Chef du groupe : <strong>{currentGroup.owner}</strong></p>
              
              <Button variant="outlined" type="button" onClick={() => joinGroup(currentGroup["@id"])}> Rejoindre le group </Button>
            </div>
        </ReactModal>    

        {/* Modale demande de groupe */}
        <ReactModal
          isOpen={isGroupeRequestOpen}
          className="GroupeModal"
          onRequestClose={handleCloseGroupeRequestModal}
          contentLabel="Groupe request"
          appElement={document.getElementById('root')}>
            <GroupeRequest/>
        </ReactModal>    

        <ToastContainer/>       
      </>


    )
}
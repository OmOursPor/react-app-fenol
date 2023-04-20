import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../styles/Groupe.scss"
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Groupe() {

    const [newGroupeData, setNewGroupeData] = useState({"name": "", "description": ""})
    const [groups, setGroups] = useState()    
    const [users, setUsers] = useState()    

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

    const handleOpenJoinModal = () => {
      setIsJoinOpen(true);
    }

    const handleCloseJoinModal = () => {
      setIsJoinOpen(false);
    }
    // gérer la popUp create END

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

    useEffect(() => {
      axios.get('http://82.65.6.187:8002/api/groups')
        .then(function (response) {
          setGroups(response.data["hydra:member"])
          console.log(response.data["hydra:member"])
        })
    }, [setGroups])

    return(
      <>
        <section className="Groupe">
            <Button variant="outlined" type="button" onClick={handleOpenCreateModal}> Créer un groupe </Button>
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
                <TableRow key={"groupRow"+i} onClick={handleOpenJoinModal}>
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

        <ReactModal
          isOpen={isJoinOpen}
          className="GroupeModal"
          onRequestClose={handleCloseJoinModal}
          contentLabel="Join group"
          appElement={document.getElementById('root')}>
            <div className="JoinGroup">
              <h3>Rejoindre ce groupe</h3>
              <p>Info sur le groupe en question</p>
              
              <Button variant="outlined" type="button" onClick={createGroupe}> Rejoindre le group </Button>
            </div>
        </ReactModal>    
      </>


    )
}
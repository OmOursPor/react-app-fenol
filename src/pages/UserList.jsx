import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from 'react';

export default function UserList() {

    const [users, setUsers] = useState()    
    
    

    useEffect(() => {
        axios.get('http://82.65.6.187:8002/api/users')
            .then(function (response) {
                setUsers(response.data["hydra:member"])
            })
      },[setUsers]);
    
    
    return (
        <>
            <TableContainer
            variant="outlined"
            >
            <Table aria-label="demo table">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users?.map((user, i) => 
                <TableRow>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
        </>    
    )
}
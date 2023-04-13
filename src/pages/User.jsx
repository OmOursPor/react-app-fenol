import {useParams} from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUsers as setUsersReducer } from "../store/reducers/user";
import axios from "axios";

export default function User() {
    let {userId} = useParams();

    const url = "http://82.65.6.187:8002/"
    const [users, setUsers] = useState({})
    const [user, setUser] = useState()
    const dispatch = useDispatch()
    const userInternal = useSelector(state => state.user.users)

    const retrieveUsers = async () => {
        let response = await axios.get(`${url}api/users`, {params: {page: 5}})
        let usersTmp = response.data["hydra:member"]
        dispatch(setUsersReducer(usersTmp))
        setUsers(usersTmp)
    }

    useEffect(() => {
        if (userInternal.length > 0) {
            setUsers(userInternal)
        } else {
            retrieveUsers()
        }
    
        if(users.length > 0) {
            users?.forEach(u => {
                if(u.id == userId)
                    setUser(u)
            });
        }
    }, [users])


    return (
        <p>username = {user?.email}</p>
    ) 
}
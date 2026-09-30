import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('https://mealplannerserverside.onrender.com/api/v1/users/me', {withCredentials: true})
        .then((response) =>{
            setUser(response.data.data);
        })
        .catch((error) =>{
            console.log(error);
        })
    },[]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
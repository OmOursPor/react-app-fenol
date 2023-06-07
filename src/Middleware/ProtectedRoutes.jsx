import { Route } from "react-router-dom";
import Profile from "../pages/Profile"
import { useSelector } from "react-redux";
import React from "react";

const ProtectedRoutes = () => {
    const isAuthenticated = useSelector((state) => state.auth.token);

    const protectedRoutes = [{path: "Profile", element: <Profile />}]
  
    // return <React.Fragment>
    //     {protectedRoutes.map((route) => (
    //         <Route
    //             key={route.path}
    //             path={route.path}
    //             element={route.element}
    //             isAuthenticated={isAuthenticated}
    //         />
    // ))}
    // </React.Fragment>

    return protectedRoutes
    
    
};

export default ProtectedRoutes;
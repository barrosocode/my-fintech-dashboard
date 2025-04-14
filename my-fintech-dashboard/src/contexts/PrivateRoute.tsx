import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "./AuthContext";

const PrivateRoute = ({children}: {children: React.ReactElement}) => {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

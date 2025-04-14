import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "./AuthContext";

const PublicRoute = ({children}: {children: React.ReactElement}) => {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;

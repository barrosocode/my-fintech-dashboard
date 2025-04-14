// Imports
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {Grid} from "@mui/material";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./contexts/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./contexts/PublicRoute";

// Base Page
function App() {
    return (
        <AuthProvider>
            <Grid container minWidth={"100%"}>
                <Router>
                    <Routes>
                        {/* Rotas públicas */}
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            }
                        />
                        {/* Rotas privadas */}
                        <Route path="/" element={<Navigate to={"/dashboard"} />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </Grid>
        </AuthProvider>
    );
}

export default App;

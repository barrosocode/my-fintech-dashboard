// Imports
import {Grid, TextField, Typography} from "@mui/material";
import StyledCard from "../components/styled-card";
import StyledButton from "../components/button";
import {Link} from "react-router-dom";

// Component
const Register = () => {
    return (
        <Grid container minWidth={"100%"} minHeight={"100vh"} justifyContent={"center"} alignContent={"center"}>
            <Grid size={{lg: 3}}>
                <StyledCard
                    cardTitle="Bem-vindo ao My Fintech!"
                    content={
                        <Grid container justifyContent={"center"}>
                            <Grid size={12} padding={2}>
                                <Typography>Cadastre-se!</Typography>
                            </Grid>
                            <Grid size={12} padding={2}>
                                <Typography>Nome</Typography>
                                <TextField fullWidth />
                            </Grid>
                            <Grid size={12} padding={2}>
                                <Typography>Email</Typography>
                                <TextField fullWidth type="email" />
                            </Grid>
                            <Grid size={12} padding={2}>
                                <Typography>Senha</Typography>
                                <TextField fullWidth type="password" />
                            </Grid>
                            <Grid size={12} padding={2}>
                                <Typography>Confirmar senha</Typography>
                                <TextField fullWidth type="password" />
                            </Grid>
                            <Grid size={10} padding={2}>
                                <StyledButton text={"Cadastrar"} />
                            </Grid>
                            <Grid size={12} padding={2}>
                                <Typography fontSize={14}>Já é cadastrado?</Typography>
                                <Typography fontSize={14}>
                                    Clique <Link to={"/login"}>Aqui</Link> e faça o login
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                />
            </Grid>
        </Grid>
    );
};

// Export
export default Register;

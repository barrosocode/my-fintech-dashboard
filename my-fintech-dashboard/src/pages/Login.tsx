import {Grid, TextField, Typography} from "@mui/material";
import StyledCard from "../components/styled-card";
import StyledButton from "../components/button";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {login} from "../services/auth";
import {useAuth} from "../contexts/AuthContext";
import Swal from "sweetalert2";

interface ValidationError {
    email?: string[];
    password?: string[];
}

const Login = () => {
    // Variáveis da requisição
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // Variável de navegação
    const navigate = useNavigate();
    // Realização do login
    const {login: contextLogin} = useAuth();
    // Validação de erros
    const [errors, setErrors] = useState<ValidationError>({});

    const handleSubmit = async () => {
        setErrors({});
        const params = {email, password};

        try {
            const response = await login(params);
            contextLogin(response.token, response.user);

            navigate("/");
        } catch (error: any) {
            if (error.response && error.response.data) {
                const data = error.response.data;

                if (error.response.data.errors) {
                    setErrors(data.errors);
                } else {
                    Swal.fire("Erro", data.message, "error");
                }
            } else {
                Swal.fire("Erro", "Desculpe, ocorreu um erro desconhecido", "error");
            }
        }
    };

    return (
        <Grid container minWidth={"100%"} minHeight={"100vh"} justifyContent={"center"} alignContent={"center"}>
            <Grid size={{xl: 2.5, lg: 3.5, md: 4.5, sm: 6, xs: 10}}>
                <StyledCard
                    cardTitle="Bem-vindo ao My Fintech!"
                    content={
                        <Grid container justifyContent={"center"}>
                            <Grid size={12} padding={2}>
                                <Typography>Para continuar, realize o login!</Typography>
                            </Grid>
                            <Grid size={12} padding={2}>
                                <Typography>Email</Typography>
                                <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth type="email" error={!!errors.email} helperText={errors.email} />
                            </Grid>
                            <Grid size={12} padding={2}>
                                <Typography>Senha</Typography>
                                <TextField value={password} onChange={(e) => setPassword(e.target.value)} fullWidth type="password" error={!!errors.password} helperText={errors.password} />
                            </Grid>
                            <Grid size={10} padding={2}>
                                <StyledButton onClick={handleSubmit} text={"Entrar"} />
                            </Grid>
                            <Grid size={12} padding={2}>
                                <Typography fontSize={14}>Ainda não é cadastrado?</Typography>
                                <Typography fontSize={14}>
                                    Clique <Link to={"/register"}>Aqui</Link> e registre-se
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                />
            </Grid>
        </Grid>
    );
};

export default Login;

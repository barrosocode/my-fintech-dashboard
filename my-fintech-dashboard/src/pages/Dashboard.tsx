import {Grid, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography} from "@mui/material";
import StyledButton from "../components/button";
import StyledCard from "../components/styled-card";
import {Balance, Transaction, TransactionTypes, User} from "../types";
import {useEffect, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {createTransaction, readTransactions} from "../services/transactions";
import {readBalance} from "../services/balance";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext"; // Importa o contexto de autenticação
import {me} from "../services/auth";

const Dashboard = () => {
    const [type, setType] = useState<TransactionTypes>("entrada");
    const [value, setValue] = useState<number | string>(0);
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(dayjs());

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<Balance>();
    const [user, setUser] = useState<User>();

    const navigate = useNavigate();
    const {logout} = useAuth(); // Obtém a função de logout do contexto

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await readTransactions();
                setTransactions(response.data);
            } catch (error) {
                console.error("Erro ao buscar transações:", error);
            }
        };

        const fetchBalance = async () => {
            try {
                const response = await readBalance();
                setBalance(response.data);
            } catch (error) {
                console.error("Erro ao buscar saldo:", error);
            }
        };

        const findUser = async () => {
            const response = await me();
            setUser(response);
        };

        fetchBalance();
        fetchTransactions();
        findUser();
    }, []);

    const handleSubmit = () => {
        const params = {
            type,
            value: Number(value),
            description,
            date: dayjs(date).format("YYYY-MM-DD"),
        };

        try {
            createTransaction(params);
            setType("entrada");
            setValue("0");
            setDescription("");
            setDate(dayjs());

            navigate("/");
        } catch (error) {
            alert(`Deu ruim: ${error}`);
        }
    };

    const handleLogout = () => {
        logout(); // Chama o logout do contexto
        navigate("/login");
    };

    return (
        <Grid container minWidth={"100%"} justifyContent={"center"} padding={3}>
            <Grid size={{xl: 8, lg: 8, md: 10, sm: 12, xs: 12}}>
                <Grid container minWidth={"100%"}>
                    <Grid size={8} textAlign={"center"} padding={2} justifyContent={"center"}>
                        <Grid container justifyContent={"center"} spacing={2}>
                            <Grid size={12}>
                                <Typography variant="h2">Olá, {user?.name}!</Typography>
                                <Typography variant="h4">Seja bem-vindo ao My Fintech</Typography>
                            </Grid>
                            <Grid size={4}>
                                <StyledButton text="Sair" onClick={handleLogout} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={4} textAlign={"center"} padding={2}>
                        <Typography variant="h4">Seu saldo é de:</Typography>
                        <Typography variant="h3">{balance?.amount}</Typography>
                    </Grid>
                </Grid>
                <Grid container minWidth={"100%"} justifyContent={"center"} padding={2} spacing={2}>
                    <Grid size={8}>
                        <StyledCard
                            cardTitle="Transações"
                            content={
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography>Valor</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Descrição</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Data</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transactions.map((transaction, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Typography>{transaction.value}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>{transaction.description}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>{transaction.date}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            }
                        />
                    </Grid>
                    <Grid size={4}>
                        <StyledCard
                            cardTitle="Adicionar Transação"
                            content={
                                <>
                                    <Grid container padding={1} spacing={2} justifyContent={"center"}>
                                        <Grid size={12}>
                                            <Typography>Tipo</Typography>
                                            <Select value={type} onChange={(e) => setType(e.target.value as TransactionTypes)} fullWidth>
                                                <MenuItem value="entrada">Entrada</MenuItem>
                                                <MenuItem value="saida">Saída</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid size={12}>
                                            <Typography>Valor</Typography>
                                            <TextField value={value} onChange={(e) => setValue(e.target.value)} fullWidth />
                                        </Grid>
                                        <Grid size={12}>
                                            <Typography>Data</Typography>
                                            <DatePicker sx={{width: "100%"}} value={date} format="DD/MM/YYYY" onChange={(newDate) => setDate(newDate)} />
                                        </Grid>
                                        <Grid size={12}>
                                            <Typography>Descrição</Typography>
                                            <TextField value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
                                        </Grid>
                                        <Grid size={12}>
                                            <StyledButton text="Cadastrar" onClick={handleSubmit} />
                                        </Grid>
                                    </Grid>
                                </>
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;

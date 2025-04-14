import {Box, Grid, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography} from "@mui/material";
import StyledButton from "../components/button";
import StyledCard from "../components/styled-card";
import {Balance, readTransactionFilter, Transaction, TransactionTypes, User} from "../types";
import {useEffect, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {createTransaction, readTransactions} from "../services/transactions";
import {readBalance} from "../services/balance";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {me} from "../services/auth";
import {logout as apiLogout} from "../services/auth";
import Swal from "sweetalert2";
import {formatCurrencyFromNumber, moneyMask, parseCurrency} from "../utils/masks";
import Footer from "../components/footer";

interface ValidationError {
    type?: string[];
    value?: string[];
    description?: string[];
    date?: string[];
}

const Dashboard = () => {
    // Variáeis da requisição
    const [type, setType] = useState<TransactionTypes>("entrada");
    const [value, setValue] = useState<string>("R$ 0,00");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    // Valores da api
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<Balance>();
    const [user, setUser] = useState<User>();
    // Variável de navegação
    const navigate = useNavigate();
    // Contexto logout
    const {logout: contextLogout} = useAuth();
    // Validação de erros
    const [errors, setErrors] = useState<ValidationError>({});
    // Filtro de datas
    const [filterDate, setFilterDate] = useState<number>(0);

    //
    const fetchTransactions = async (filter: readTransactionFilter) => {
        try {
            const response = await readTransactions(filter);
            setTransactions(response.data);
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
        }
    };

    useEffect(() => {
        const start_date = filterDate === 0 ? "" : dayjs().subtract(filterDate, "day").format("YYYY-MM-DD");

        const filter = {
            start_date: start_date,
            end_date: dayjs().format("YYYY-MM-DD"),
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
        fetchTransactions(filter);
        findUser();
    }, [filterDate]);

    const handleSubmit = async () => {
        setErrors({});

        const params = {
            type,
            value: parseCurrency(value),
            description,
            date: dayjs(date).format("YYYY-MM-DD"),
        };

        const start_date = filterDate === 0 ? "" : dayjs().subtract(filterDate, "day").format("YYYY-MM-DD");

        const filter = {
            start_date: start_date,
            end_date: dayjs().format("YYYY-MM-DD"),
        };

        try {
            await createTransaction(params).then(() => {
                Swal.fire("Sucesso", "Transação cadastrada com sucesso", "success");
            });

            setType("entrada");
            setValue("R$ 0,00");
            setDescription("");
            setDate(dayjs());

            fetchTransactions(filter);
        } catch (error: any) {
            if (error.response && error.response.data) {
                const data = error.response.data;
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    Swal.fire("Erro", data.message, "error");
                }
            } else {
                Swal.fire("Erro", "Desculpe, ocorreu um erro desconhecido", "error");
            }
        }
    };

    const handleLogout = async () => {
        try {
            await apiLogout();
            contextLogout();
            navigate("/login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = moneyMask(e.target.value);
        setValue(masked);
    };

    return (
        <>
            <Grid container minWidth={"100%"} justifyContent={"center"} padding={3}>
                <Grid size={{xl: 8, lg: 8, md: 10, sm: 12, xs: 12}}>
                    <Grid container minWidth={"100%"} justifyContent={"center"} alignItems={"center"}>
                        <Grid size={{xl: 8, lg: 8, md: 10, sm: 12, xs: 12}} textAlign={"center"} padding={2} justifyContent={"center"}>
                            <Grid container justifyContent={"center"} spacing={2}>
                                <Grid size={12}>
                                    <Typography variant="h1">
                                        <img src="/logo.png" alt="Logo" style={{height: "2em", verticalAlign: "middle"}} />
                                        Fintech
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={{xl: 4, lg: 4, md: 6, sm: 8, xs: 10}}>
                            <Grid container minWidth={"100%"} justifyContent={"center"}>
                                <Grid size={12} textAlign={"center"}>
                                    <Typography variant="h5">Olá, {user?.name}!</Typography>
                                    <Typography variant="h5">Seu saldo é de:</Typography>
                                    <Typography variant="h4">{formatCurrencyFromNumber(Number(balance?.amount))}</Typography>
                                </Grid>
                                <Grid size={10} padding={2}>
                                    <StyledButton text="Sair" onClick={handleLogout} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container minWidth={"100%"} justifyContent={"center"} padding={2} spacing={2} alignItems="stretch">
                        <Grid size={{xl: 8, lg: 8, md: 10, sm: 12, xs: 12}}>
                            <StyledCard
                                cardTitle="Transações"
                                content={
                                    <>
                                        <Grid size={6}>
                                            <Typography>Período</Typography>
                                            <Select
                                                value={filterDate}
                                                onChange={(e) => {
                                                    setFilterDate(Number(e.target.value));
                                                }}
                                                fullWidth
                                            >
                                                <MenuItem value={7}>7 Dias</MenuItem>
                                                <MenuItem value={30}>30 Dias</MenuItem>
                                                <MenuItem value={90}>90 Dias</MenuItem>
                                                <MenuItem value={365}>1 Ano</MenuItem>
                                                <MenuItem value={0}>Sempre</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Box sx={{maxHeight: 408, overflowY: "auto"}}>
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
                                                            <TableCell>{transaction.type === "entrada" ? <Typography color="green">{formatCurrencyFromNumber(String(transaction.value))}</Typography> : <Typography color="red">{formatCurrencyFromNumber(transaction.value)}</Typography>}</TableCell>
                                                            <TableCell>
                                                                <Typography>{transaction.description}</Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography>{dayjs(transaction.date).format("DD/MM/YYYY")}</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </>
                                }
                            />
                        </Grid>
                        <Grid size={{xl: 4, lg: 4, md: 10, sm: 12, xs: 12}}>
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
                                                <TextField value={value} onChange={handleValueChange} fullWidth error={!!errors.value} helperText={errors.value} />
                                            </Grid>
                                            <Grid size={12}>
                                                <Typography>Data</Typography>
                                                <DatePicker sx={{width: "100%"}} value={date} format="DD/MM/YYYY" onChange={(newDate) => setDate(newDate)} />
                                            </Grid>
                                            <Grid size={12}>
                                                <Typography>Descrição</Typography>
                                                <TextField value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth error={!!errors.description} helperText={errors.description} />
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
            <Grid container minWidth={"100%"} justifyContent={"center"}>
                <Footer />
            </Grid>
        </>
    );
};

export default Dashboard;

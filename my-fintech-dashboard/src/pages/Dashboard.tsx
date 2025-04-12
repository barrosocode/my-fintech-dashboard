// Imports
import {Grid, MenuItem, Select, Table, TableCell, TableHead, TableRow, TextField, Typography} from "@mui/material";
import StyledButton from "../components/button";
import StyledCard from "../components/styled-card";
import {Transaction, TransactionTypes} from "../types";
import {useEffect, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {readTransactions} from "../services/transactions";

// Component
const Dashboard = () => {
    // Variáveis - cadastro de transação type, value, description, date
    const [type, setType] = useState<TransactionTypes>("entrada");
    const [value, setValue] = useState<number | string>(0);
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Requisição para listar as transações
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await readTransactions();
                setTransactions(response);
            } catch (error) {
                console.error("Erro ao buscar transações:", error);
            }
        };

        fetchTransactions();
    }, []);

    console.log(transactions);

    // Função de logout
    const handleLogout = () => {
        console.log("logout");
    };

    // Função Cadastrar Transação
    const handleSubmit = () => {
        const params = {
            type,
            value,
            description,
            date,
        };

        console.log(params);
    };

    return (
        <Grid container minWidth={"100%"} justifyContent={"center"} padding={3}>
            <Grid size={{xl: 8, lg: 8, md: 10, sm: 12, xs: 12}}>
                <Grid container minWidth={"100%"}>
                    <Grid size={8} textAlign={"center"} padding={2} justifyContent={"center"}>
                        <Grid container justifyContent={"center"} spacing={2}>
                            <Grid size={12}>
                                <Typography variant="h2">Olá, fulano!</Typography>
                                <Typography variant="h4">Seja bem vindo ao My Fintech</Typography>
                            </Grid>
                            <Grid size={4}>
                                <StyledButton text="Sair" onClick={handleLogout} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={4} textAlign={"center"} padding={2}>
                        <Typography variant="h4">Seu saldo é de:</Typography>
                        <Typography variant="h3">9.999,99</Typography>
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
                                            <Select
                                                value={type}
                                                onChange={(e) => {
                                                    setType(e.target.value as TransactionTypes);
                                                }}
                                                fullWidth
                                            >
                                                <MenuItem value="entrada">Entrada</MenuItem>
                                                <MenuItem value="saida">Saída</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid size={12}>
                                            <Typography>Valor</Typography>
                                            <TextField
                                                value={value}
                                                onChange={(e) => {
                                                    setValue(e.target.value);
                                                }}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={12}>
                                            <Typography>Data</Typography>
                                            <DatePicker
                                                sx={{width: "100%"}}
                                                value={date}
                                                format="DD/MM/YYYY"
                                                onChange={(newDate) => {
                                                    setDate(newDate);
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={12}>
                                            <Typography>Descrição</Typography>
                                            <TextField
                                                value={description}
                                                onChange={(e) => {
                                                    setDescription(e.target.value);
                                                }}
                                                multiline
                                                rows={3}
                                                fullWidth
                                            />
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

// Export
export default Dashboard;

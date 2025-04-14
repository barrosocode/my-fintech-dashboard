// Imports
import api from "./api";
import {readTransactionFilter, Transaction} from "../types";

/**
 * Transactions functions
 */

// Create (POST)
export const createTransaction = async (params: Transaction) => {
    const response = await api.post("/transactions", params);

    return response.data;
};

// Read (GET)
export const readTransactions = async (filter: readTransactionFilter) => {
    const response = await api.get(`/transactions?start_date=${filter.start_date}&end_date=${filter.end_date}`);

    return response.data;
};

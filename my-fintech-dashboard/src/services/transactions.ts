// Imports
import api from "./api";
import {Transaction} from "../types";

/**
 * Transactions functions
 */

// Create (POST)
export const createTransaction = async (params: Transaction) => {
    const response = await api.post("/transactions", params);

    return response.data;
};

// Read (GET)
export const readTransactions = async () => {
    const response = await api.get("transactions");

    return response.data;
};

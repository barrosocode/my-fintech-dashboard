// Imports
import api from "./api";

/**
 * Balance
 */

// Read
export const readBalance = async () => {
    const response = await api.get("/balance");

    return response.data;
};

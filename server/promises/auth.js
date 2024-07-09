import { pool } from "./users.js"

export const pushRefreshToken = async(token) =>{
    const [row] = await pool.query("INSERT INTO RefreshToken(refreshToken) VALUES ( ?)", [token]);

    return row;
}

export const getRefreshToken = async(token) =>{
    const [rows] = await pool.query("SELECT * FROM RefreshToken WHERE refreshToken=?", [token]);

    return rows;
}

export const getAllRefreshToken = async() =>{
    const [rows] = await pool.query("SELECT * FROM RefreshToken");

    return rows;
}

export const deleteToken = async(token) =>{
    const [row] = await pool.query("DELETE FROM RefreshToken WHERE refreshToken=?", [token]);

    return row;
}

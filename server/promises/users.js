import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config();
export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  }).promise()
export const getUsers = async()=>{
    const [rows] = await pool.query("SELECT * FROM Users");

    return rows;
}

export const createUser = async(name, contactNumber, email, password, role, status) =>{
    const [rows] = await pool.query("INSERT INTO Users(name, contactNumber, email, password, role, status) VALUES ( ?, ?, ?, ?, ?, ?)", [name, contactNumber, email, password, role, status]);

    return rows;
}

export const changeName = async(id, name) =>{
    const [row] = await pool.query("UPDATE Users SET name =? WHERE id = ?", [name,id]);

    return row;
}

export const changeEmail = async(id, email) =>{
    const [row] = await pool.query("UPDATE Users SET email=? WHERE id = ?", [email,id]);

    return row;
}

export const changePassword = async(id, password) =>{
    const [row] = await pool.query("UPDATE Users SET password =? WHERE id = ?", [password,id]);

    return row;
}

export const changeStatus = async(id, status) =>{
    const [row] = await pool.query("UPDATE Users SET status =? WHERE id = ?", [status,id]);

    return row;
}

export const getUser = async(id) =>{
    const [row] = await pool.query("Select * FROM Users WHERE id=?", [id]);

    return row;
}



export const getUserEmail = async(email) =>{
    const [row] = await pool.query("Select * FROM Users WHERE email=?", [email]);

    return row;
}


export const deleteUser = async(id) =>{
    const result = await pool.query("DELETE FROM Users WHERE id = ?", [id]);

    return result;
}

export const deleteUsers = async()=>{
    const result = await pool.query("DELETE FROM Users");

    return result;
}
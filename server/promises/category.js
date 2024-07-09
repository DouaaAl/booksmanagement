import { pool } from "./users.js";
export const getCategories = async()=>{
    const [rows] = await pool.query("SELECT * FROM category");

    return rows;
}

export const createCategory = async(name) =>{
    const [rows] = await pool.query("INSERT INTO category(name) VALUES (?)", [name]);

    return rows;
}

export const deleteCategory = async(name) =>{
    const [row] = await pool.query("DELETE FROM category WHERE name=?", [name]);

    return row;
}

export const updateCategory = async(id,name) =>{
    const [row] = await pool.query("UPDATE category SET name=? WHERE id=?", [name, id]);

    return {row,id};
}


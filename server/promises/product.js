import { pool } from "./users.js";
export const getProducts = async()=>{
    const [rows] = await pool.query("SELECT * FROM product");

    return rows;
}

export const getProduct = async(id)=>{
    const [rows] = await pool.query("SELECT * FROM product WHERE id = ?", [id]);

    return rows;
}

export const getProductByCategory = async(id)=>{
    const [rows] = await pool.query("SELECT * FROM product WHERE categoryId = ?", [id]);

    return rows;
}

export const createProduct = async(name,
    categoryId,
    description,
    price,
    status) =>{
    const [rows] = await pool.query("INSERT INTO product(name,categoryId,description,price,status) VALUES (?, ?,?,? ,?)", [name,
        categoryId,
        description,
        price,
        status]);

    return rows;
}

export const deleteProduct = async(id) =>{
    const [row] = await pool.query("DELETE FROM product WHERE id=?", [id]);

    return row;
}

export const updateProduct= async(name, price,id,status, categoryId, description)=>{
    const [row] = await pool.query("UPDATE product SET name=? , price=?, status=?, categoryId=?, description=? WHERE id=?", [name, price, status, categoryId, description, id]);

    return row;
}

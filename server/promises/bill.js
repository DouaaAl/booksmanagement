import { pool } from "./users.js";
export const getBills = async()=>{
    const [rows] = await pool.query("SELECT * FROM bill");

    return rows;
}

export const getBill = async(id)=>{
    const [rows] = await pool.query("SELECT * FROM bill WHERE id = ?", [id]);

    return rows;
}

export const createBill = async (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) => {
    const sql = "INSERT INTO bill(uuid, name, email, contactNumber, paymentMethod, total, productDetails, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    // Ensure total is parsed as float if necessary
    const parsedTotal = parseFloat(total);

    // Convert productDetails object to a JSON string
    const stringifiedProductDetails = JSON.stringify(productDetails);

    const values = [uuid, name, email, contactNumber, paymentMethod, parsedTotal, stringifiedProductDetails, createdBy];

    try {
        const [rows] = await pool.query(sql, values);
        return rows;
    } catch (err) {
        throw err;
    }
}
export const deleteBill = async(id) =>{
    const [row] = await pool.query("DELETE FROM bill WHERE id=?", [id]);

    return row;
}

export const updateBill = async(id, name, email, contactNumber, paymentMethod, total, productDetails, createdBy) =>{
    const [row] = await pool.query("UPDATE category SET name=? email=? contactNumber=? paymentMethod=? total=? productDetails=? createdBy=? WHERE id=?", [name, email, contactNumber, paymentMethod, total, productDetails, createdBy, id]);

    return {row,id};
}

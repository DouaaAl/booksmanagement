import express from "express";
import { verify } from "./auth.js"
import { pool } from "../promises/users.js";

const router = express.Router();

router.get("/details", verify, async(req,res,next)=>{
    let categoryCount;
    let productCount;
    let billCount;
    categoryCount = await pool.query("SELECT count(id) as categoryCount from category");
    categoryCount = categoryCount[0][0].categoryCount;
    productCount = await pool.query("SELECT count(id) as productCount from product");
    productCount = productCount[0][0].productCount;
    billCount = await pool.query("SELECT count(id) as billCount from bill");
    billCount = billCount[0][0].billCount;
    res.status(200).json({
        billCount,
        productCount,
        categoryCount
    });
})

export default router;
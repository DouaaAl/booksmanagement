import express from "express"
import ejs, { name } from "ejs"
import pdf from "html-pdf"
import path from "path"
import uuid from "uuid";
import { verify } from "./auth.js"
import { pool } from "../promises/users.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { deleteBill, getBill, getBills, updateBill } from "../promises/bill.js";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/", async(req,res)=>{
    let result = await getBills();
    res.status(200).json(result);
})

router.get("/:id", async(req,res)=>{
    let id = req.params.id;
    let result = await getBill(id);
    
    res.status(200).json(result);
})


router.post("/:id", async(req,res)=>{
    let {id, name, email, contactNumber, paymentMethod, total, productDetails, createdBy} = req.body;
    let result = await updateBill(id, name, email, contactNumber, paymentMethod, total, productDetails, createdBy);

    return result;
})

router.delete("/:id", async(req,res)=>{
    let id = req.params.id;
    let result = await deleteBill(id);
    
    res.status(200).json(result);
})

router.post("/report/view", verify, async (req, res) => {
    const orderDetails = req.body;
    const generateUuid = uuid.v1();
    let productDetails;


    try {
        productDetails = JSON.parse(orderDetails.productDetails);
    } catch (err) {
        console.log("Invalid JSON format for productDetails");
        return res.status(400).json({ error: "Invalid productDetails JSON format" });
    }

    const totalAmount = parseInt(orderDetails.total, 10);
    if (isNaN(totalAmount)) {
        console.log("Invalid total amount");
        return res.status(400).json({ error: "Invalid total amount" });
    }

    try {
        console.log("inserting row");
        const insertResult = await pool.query(
            "INSERT INTO bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                orderDetails.name,
                generateUuid,
                orderDetails.email,
                orderDetails.contactNumber,
                orderDetails.paymentMethod,
                totalAmount,
                JSON.stringify(productDetails),
                orderDetails.createdBy
            ]
        )
        if (insertResult) {
            console.log("row inserted, dirname: ",__dirname);
            await ejs.renderFile(
                path.join(__dirname, '', 'bill.ejs'),
                {
                    productDetails: productDetails,
                    name: orderDetails.name,
                    email: orderDetails.email,
                    contactNumber: orderDetails.contactNumber,
                    paymentMethod: orderDetails.paymentMethod,
                    totalAmount: totalAmount
                },
                "",
                async (err, data) => {
                    if (err) {
                        console.log("Error generating PDF:", err);
                        return res.status(500).json({ error: "Error generating PDF" });
                    }

                    try {
                        const pdfResult = pdf.create(data).toFile(__dirname,`../generated_pdf/${generateUuid}.pdf`, (err, pdfResult)=>{
                            console.log("pdf created successfully");
                            res.status(200).json({ message: generateUuid });             
                        });

                    } catch (pdfErr) {
                        console.log("Error saving PDF:", pdfErr);
                        res.status(500).json({ error: "Error saving PDF" });
                    }
                }
            );
        } else {
            res.status(400).json({ error: "Failed to insert bill" });
        }
    } catch (sqlErr) {
        console.log("Database error:", sqlErr);
        res.status(500).json({ error: "Database error", details: sqlErr });
    }
});


router.get('/pdf/get/:id', (req, res) => {
    console.log("dirname");
    const pdfPath = path.join(__dirname, '../generated_pdf', req.params.id + ".pdf");
    console.log("this is pdf path :",pdfPath);
    fs.readFile(pdfPath, (err, data) => {
      if (err) {
        console.error('Error reading PDF file:', err);
        res.status(500).send('Error reading PDF file');
        return;
      }
      res.setHeader('Content-Type', 'application/pdf');
      res.send(data);
    });
  });
export default router;
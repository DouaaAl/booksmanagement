import express from "express";
import dotenv from "dotenv"
import usersRouter from "./routers/users.js";
import authRouter from "./routers/auth.js";
import billRouter from "./routers/bill.js";
import dashboardRouter from "./routers/dashboard.js";
import categoryRouter from "./routers/category.js";
import productRouter from "./routers/product.js";
import cors from "cors";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const publicPath = path.join(__dirname, '../frontend/public');
console.log(publicPath);


app.use(cors());
app.use(express.json( { extended: true } ));
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/bill", billRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use(express.static(publicPath));



app.listen(process.env.PORT, () =>{
    console.log("Server is running on port 5000");
})
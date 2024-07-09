import express from "express";
import {changeName, getUser, deleteUser, deleteUsers, changeStatus, changePassword, changeEmail} from "../promises/users.js";
import dotenv  from "dotenv";
import { verify } from "./auth.js";

dotenv.config();

const router = express.Router();

router.get("/:id", async(req,res) =>{
    const id = req.params["id"];
    const result = await getUser(id);
    res.status(200).json(result);
})

router.delete("/:id", verify, async(req,res)=>{
    const id = req.params["id"];
    const result = await deleteUser(id);
    res.status(200).json(result);
})
router.delete("/", async(req,res)=>{
    const result = await deleteUsers();
    res.status(200).json(result);
})


router.post("/changename/:id", async(req,res)=>{
    const {name} = req.body;
    const id = req.params["id"];
    const result = await changeName(id, name);
    res.status(200).json(result);
})
router.post("/changeemail/:id", async(req,res)=>{
    const {email} = req.body;
    const id = req.params["id"];
    const result = await changeEmail(id, email);
    console.log(result);
    res.status(200).json(result);
})

router.post("/changepassword/:id", async(req,res)=>{
    const id = req.params['id'];
    const {password} = req.body;
    const result = await changePassword(id, password);
    res.status(200).json(result);
})


router.post("/:id", async(req,res)=>{
    const {status} = req.body;
    const id = req.params["id"];
    const result = await changeStatus(id, status);
    res.status(200).json(result);
})


export default router;
import express from "express"
import { createCategory, deleteCategory, getCategories, updateCategory } from "../promises/category.js";

const router = express.Router();

router.get("/", async(req,res)=>{
    let result = await getCategories();

    res.status(200).json(result);
})

router.post("/", async(req,res)=>{
    let {name} = req.body;
    let result = await createCategory(name);

    res.status(200).json(result);
})

router.delete("/:name", async(req,res)=>{
    let {name} = req.params;
    console.log(name);
    let result = await deleteCategory(name);

    res.status(200).json(result);
})

router.post("/:id", async(req,res)=>{
    let {id} = req.params;
    let {name} = req.body;
    let result = await updateCategory(id, name);
    res.status(200).json(result);
})

export default router;
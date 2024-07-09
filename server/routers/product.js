import express from "express"
import { createProduct, deleteProduct, getProduct, getProductByCategory, getProducts, updateProduct } from "../promises/product.js";

const router = express.Router();

router.get("/", async(req,res)=>{
    let result = await getProducts();

    res.status(200).json(result);
})

router.get("/:id", async(req,res)=>{
    let id = req.params.id;
    let result = await getProduct(id);

    res.status(200).json(result);
})

router.post("/", async(req,res)=>{
    let {name,
        categoryId,
        description,
        price,
        status} = req.body;
    let result = await createProduct(name,
        categoryId,
        description,
        price,
        status);
    
    res.status(200).json(result);
})

router.delete("/:id", async(req,res)=>{
    let id = req.params.id;
    let result = await deleteProduct(id);

    res.status(200).json(result);
})

router.post("/:id", async(req,res)=>{
    let {id} = req.params;
    let {
        name, price,status, categoryId, description
    } = req.body;
    let result = await updateProduct(name, price,id,status, categoryId, description);

    res.status(200).json(result);
})

router.post("/categoryId/:id", async(req,res)=>{
    let {id} = req.params;
    let result = await getProductByCategory(id);

    res.status(200).json(result);
})

export default router;
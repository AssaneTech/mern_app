import Product from "../models/product.model.js";
import mongoose from "mongoose";

/*_______________________________GET ALL PRODUCTS_________________________________*/
export const getProducts = async(req, res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true, data:products});
    }catch(error){
        console.log("Error in fetching data : ", error.message);
        res.status(500).json({success:false, message:'Server Error'});
    }
}

/*_______________________________ADDING A PRODUCT_________________________________*/
export const createProduct = async (req,res) => {
    const product = req.body; //user will send this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({succes:false, message: "Provides all fields"});
    }
    const newProduct = new Product (product) // newProduct will retrieve data in product

    try {
        await newProduct.save(); // waiting the dat will be saved in newProduct
        res.status(201).json({success:true, data:newProduct});
    }
    catch{
        console.error("Error in create product :", error.message);
        res.status(500).json({succes: false, message: "Server Error f"})
    }
}

/*_______________________________DELETING A PRODUCT_________________________________*/
export const deleteProduct = async(req,res) =>{
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({succes:true, message:"Product deleted"});
    }catch(error){

    }
}

/*_______________________________UPDATING  A PRODUCT_________________________________*/
export const updateProduct = async(req,res) =>{
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Invalid Product Id"});
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({succes:true, data : updatedProduct});
    }catch(error){
        console.log("error in deleting product", error.message);
        res.status(500).json({succes: false, message:"Server Error"});
    }
}




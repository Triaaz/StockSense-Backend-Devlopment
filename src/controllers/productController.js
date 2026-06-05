const productModel = require('../models/product')
const stockMovementModel = require('../models/stockMovementModel')

const createProduct = async(req,res)=>{
    try{
        const {name,
            category,
            costPrice,
            sellingPrice,
            openingStock,
            reorderLevel,
            unitOfMeasure,
            expiryDate,
            supplierLink,
            sku}=req.body;
        const product = await productModel.create({name,
            category,
            costPrice,
            sellingPrice,
            openingStock,
            reorderLevel,
            unitOfMeasure,
            expiryDate,
            supplierLink,
            sku})
        return res.status(201).json({message: 'Product created', data : product})
    }catch (error){
        return res.status(500).json({message : 'Error creating product', error : error.message})
    }
};

const getAllProducts = async(req,res)=>{
    try{
        const {category,lowStock,name} = req.query;
        const filter = {}
        if(category){
            filter.category = category
        }
        if(lowStock === 'true'){
            filter.$expr = {$lte: ['$currentStock', '$reorderLevel']}
        }
        if(name){
            filter.name = {$regex: name, $options : 'i'}
        }
        const products = await productModel.find(filter)
        if(products.length === 0){
            return res.status(200).json({message : 'No products found', data : []})
        }
        return res.status(200).json({message : 'Products', data : products})
    }catch(error){
        return res.status(500).json({message : 'Error getting products', error : error.message})
    }
};

const getOneProduct = async(req,res)=>{
    try{
        const {id} = req.params
        const product = await productModel.findById(id)
        if(!product){
            return res.status(404).json({message : 'No product found'})
        }
        return res.status(200).json({data : product})
    }catch(error){
        return res.status(500).json({message : 'Error getting product', error : error.message})
    }
};

const updateProduct = async(req,res)=>{
    try{
        const {id} = req.params
        const {name,
            category,
            costPrice,
            sellingPrice,
            openingStock,
            reorderLevel,
            unitOfMeasure,
            expiryDate,
            supplierLink,
            sku}=req.body;
        const product = await productModel.findByIdAndUpdate(id,{name,
            category,
            costPrice,
            sellingPrice,
            openingStock,
            reorderLevel,
            unitOfMeasure,
            expiryDate,
            supplierLink,
            sku},{new:true});
        if(!product){
            return res.status(404).json({message : 'No product found'})
        }
        return res.status(200).json({message : 'Product updated', data : product})
    }catch(error){
        return res.status(500).json({message : 'Error updating product', error : error.message})
    }
};

const deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params
        const product = await productModel.findByIdAndUpdate(id,{deletedAt: new Date(), isActive: false},{new:true})
        if(!product){
            return res.status(404).json({message : 'No product found'})
        }
        return res.status(200).json({message : 'Product deleted'})
    }catch(error){
        return res.status(500).json({message : 'Error deleting product', error : error.message})
    }
};

const stockIn = async(req,res)=>{
    try{
        const {id} = req.params
        const {quantity, notes} = req.body
        const product = await productModel.findById(id)
        if(!product){
            return res.status(404).json({message : 'No product found'})
        }
        const quantityBefore = product.currentStock
        product.currentStock = product.currentStock + quantity
        await product.save()
        await stockMovementModel.create({
            product : id,
            user : req.user._id,
            movementType : 'stock_in',
            quantity : quantity,
            quantityBefore : quantityBefore,
            quantityAfter : product.currentStock,
            note: notes
        })
        return res.status(200).json({message : 'Stock in', data : product})
    }catch(error){
        return res.status(500).json({message : 'Error getting stock in ', error : error.message})
    }
};

const stockOut = async(req,res)=>{
    try{
        const {id} = req.params
        const {quantity,reason} = req.body
        const product = await productModel.findById(id)
        if(!product){
            return res.status(404).json({message : 'No product found'})
        }
        if(!reason){
            return res.status(400).json({message : 'Reason is required for stock out'})
        }
        const quantityBefore = product.currentStock
        if(quantity > product.currentStock){
            return res.status(400).json({message : 'Insufficient stock'})
        }
        product.currentStock = product.currentStock - quantity
        await product.save()
        await stockMovementModel.create({
            product : id,
            user : req.user.id,
            movementType : 'stock_out',
            quantity : quantity,
            quantityBefore : quantityBefore,
            quantityAfter : product.currentStock,
            note : reason
        })
        return res.status(200).json({message : 'Stock out', data : product})
    }catch(error){
        return res.status(500).json({message : 'Error getting stock out', error : error.message })
    }
};

const lowStockProduct = async(req,res)=>{
    try {
       const product = await productModel.find({
        $expr: {$lte:['$currentStock','$reorderLevel']}
       })
       if(product.length===0){
        return res.status(200).json({message : 'No low stock products', data : []})
       }
       return res.status(200).json({message : 'Low stock products', data : product})
    }catch(error){
        return res.status(500).json({message : 'Error getting low stock product', error: error.message})
    }
};

const stockHistory = async(req,res)=>{
    try{
        const {id} = req.params;
        const movement = await stockMovementModel.find({product: id})
        if(movement.length===0){
            return res.status(200).json({message : 'No stock history found', data : []})
        }
        return res.status(200).json({message : 'Stock history', data : movement})
    }catch(error){
        return res.status(500).json({message : 'Error getting stock history', error : error.message})
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    stockIn,
    stockOut,
    lowStockProduct,
    stockHistory
}
const categoryModel = require ('../models/categoryModel');

//Create category
const createCategory = async (req,res)=> {
    try {
        const {name } = req.body
        const category = await categoryModel.create({name});
        return res.status(201).json({message : 'category created', data : category})
    }catch (error){
        if(error.name === 'ValidationError'){
            return res.status(400).json({message : 'Validation error', error : error.message})
        }
        return res.status(500).json({message : 'Error creating category', error : error.message})
    }
};

//Get all category
const getAllCategories = async (req,res)=> {
    try{
        const categories = await categoryModel.find()
        if(categories.length == 0){
            return res.status(200).json({message : 'No category found', data: []})
        }
        return res.status(200).json({message : 'Categories', data : categories})
    }catch(error){
        return res.status(500).json({message : 'Error getting all categories', error : error.message})
    }
};

//Get one category
const getOneCategory = async (req,res)=> {
    try{
        const {id} = req.params
        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(404).json({message : 'No category found'})
        }
        return res.status(200).json({data : category})
    }catch(error){
        return res.status(500).json({message : 'Error getting category', error : error.message})
    }
};

//Update category 
const updateCategory = async(req,res)=>{
    try{
        const {id} = req.params
        const {name} = req.body
        const category = await categoryModel.findByIdAndUpdate(id,{name},{new:true});
        if(!category){
            return res.status(404).json({message : 'NO category found'})
        }
        return res.status(200).json({message : 'Category updated', data : category})
    }catch(error){
        if(error.name === 'ValidationError'){
            return res.status(400).json({message : 'Validation error', error : error.message})
        }
        return res.status(500).json({message : 'Error updating category', error : error.message})
    }
};

//Delete category
const deleteCategory = async(req,res)=>{
    try{
        const {id} = req.params
        const category = await categoryModel.findByIdAndDelete(id);
        if(!category){
            return res.status(404).json({message : 'No category found'})
        }
        return res.status(200).json({message : 'Category deleted'})
    }catch(error){
        return res.status(500).json({message : 'Error deleting category', error : error.message})
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory
}
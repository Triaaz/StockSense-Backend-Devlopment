const express = require('express')
const router = express.Router()
const {
    createCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController')

router.post('/',createCategory)
router.get('/',getAllCategories)
router.get('/:id',getOneCategory)
router.put('/:id',updateCategory)
router.delete('/:id',deleteCategory)

module.exports = router
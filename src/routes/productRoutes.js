const express = require('express')
const router = express.Router()
const {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    stockIn,
    stockOut,
    lowStockProduct,
    stockHistory
} = require('../controllers/productController')

router.post('/', createProduct)
router.get('/', getAllProducts)
router.get('/low-stock', lowStockProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.post('/:id/stockin', stockIn)
router.post('/:id/stockout', stockOut)
router.get('/:id/history', stockHistory)
router.get('/:id', getOneProduct)

module.exports = router
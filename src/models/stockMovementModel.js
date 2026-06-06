const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    movementType : {
        type : String,
        enum : ['stock_in','stock_out','adjustment','sale'],
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    quantityBefore : {
        type : Number,
        required : true
    },
    quantityAfter : {
        type : Number,
        required : true
    },
    note : {
        type : String,
    }
}, {timestamps : true})

const stockMovementModel = mongoose.model('StockMovement',stockMovementSchema )

module.exports = stockMovementModel
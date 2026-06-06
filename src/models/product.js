const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    category: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    costPrice : {
        type : Number,
        required : true
    },
    sellingPrice : {
        type : Number,
        required : true
    },
    openingStock : {
        type : Number,
        required : true
    },
    currentStock : {
        type : Number,
        default : 0
    },
    reorderLevel : {
        type : Number,
        default : 5
    },
    unitOfMeasure : {
        type : String
    },
    expiryDate : {
        type : Date
    },
    supplierLink : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Supplier",
        default : null
    },
    deletedAt :{
        type : Date,
        default : null
    },
    isActive : {
        type : Boolean,
        default : true
    },
    sku : {
        type : String
    },
}, { timestamps: true });

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);
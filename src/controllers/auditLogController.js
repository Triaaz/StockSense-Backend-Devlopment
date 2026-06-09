const inventoryHistory = require('../models/inventoryHistory')

const getAuditLogs = async(req,res)=>{
    try {
        const {product,type,startDate,endDate} = req.query
        const filter = {}
        if(product) filter.product = product
        if(type) filter.type = type
        if(startDate && endDate){
            filter.createdAt = {
                $gte : new Date(startDate),
                $lte : new Date(endDate)
            }
        }
        const auditLogs = await inventoryHistory.find(filter).sort({createdAt: -1})
        if (auditLogs.length === 0) {
      return res.status(200).json({ message: "No audit logs found", data : [] });
    }
        return res.status(200).json({message : 'Audit logs', data : auditLogs})
    }catch(error){
        return res.status(500).json({message : 'Error getting audit logs', error : error.message})
    }
};

const getAuditLogsByProduct = async(req,res)=>{
    try {
        const {productId} = req.params
        if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }
    const productLog = await inventoryHistory.find({product:productId}).sort({createdAt : -1})
    if(!productLog.length === 0){
        return res.status(200).json({message : 'No logs found for this product', data : []})
    }
    return res.status(200).json({message : 'Product audit logs', data : productLog})
    }catch(error){
        return res.status(500).json({message : 'Error getting audit logs by product', error : error.message})
    }
};

const getAuditLogsByType = async(req,res)=>{
    try {
        const {type} = req.params
        if (!type) {
      return res.status(400).json({ message: "Type is required" });
    }
    const typeLog = await inventoryHistory.find({type:type}).sort({createdAt: -1})
    if(typeLog.length === 0){
        return res.status(200).json({message : 'No logs found for this type', data : []})
    }
    return res.status(200).json({message : 'Type audit logs', data : typeLog})
    }catch(error){
        return res.status(500).json({message : 'Error getting audit logs by type', error : error.message})
    }
};

module.exports = {
    getAuditLogs,
    getAuditLogsByProduct,
    getAuditLogsByType

}
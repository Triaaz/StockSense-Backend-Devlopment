const express = require('express');
const router = express.Router();

const {
    getAuditLogs,
    getAuditLogsByProduct,
    getAuditLogsByType
} = require('../controllers/auditLogController.js')

router.get('/', getAuditLogs);
router.get('/product/:productId', getAuditLogsByProduct);
router.get('/type/:type', getAuditLogsByType)

module.exports = router
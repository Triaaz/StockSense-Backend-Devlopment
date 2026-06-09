# Postman Testing Guide

## Setup
1. Set base_url = http://localhost:5000/api
2. Start server: node src/server.js

---

## Test Cases

### 1. Authentication
- [ ] POST /api/auth/register - Create user - 201
- [ ] POST /api/auth/login - Login - 200

### 2. Suppliers
- [ ] POST /api/suppliers - Create - 201
- [ ] GET /api/suppliers - Get all - 200
- [ ] GET /api/suppliers/:id - Get one - 200
- [ ] PUT /api/suppliers/:id - Update - 200
- [ ] DELETE /api/suppliers/:id - Delete - 200

### 3. Products
- [ ] POST /api/products - Create - 201
- [ ] GET /api/products - Get all - 200

### 4. Purchase Orders
- [ ] POST /api/purchase-orders - Create - 201
- [ ] GET /api/purchase-orders - Get all - 200
- [ ] PUT /api/purchase-orders/:id - Update status - 200
- [ ] DELETE /api/purchase-orders/:id - Delete - 200

### 5. Business Profile
- [ ] PUT /api/profile - Create/Update - 200
- [ ] GET /api/profile - Get - 200

### 6. Alerts
- [ ] POST /api/alerts/check - Low stock check - 200
- [ ] POST /api/alerts/check-expiry - Expiry check - 200
- [ ] GET /api/alerts - Get all - 200
- [ ] GET /api/alerts/summary - Summary - 200
- [ ] PUT /api/alerts/:id/read - Mark read - 200
- [ ] PUT /api/alerts/read-all - Mark all read - 200
- [ ] DELETE /api/alerts/:id - Delete - 200

### 7. Reports
- [ ] GET /api/reports/summary - Dashboard - 200
- [ ] GET /api/reports/low-stock - Low stock - 200
- [ ] GET /api/reports/order-status - Status breakdown - 200
- [ ] GET /api/reports/recent-orders - Recent - 200
- [ ] GET /api/reports/supplier-performance - Stats - 200
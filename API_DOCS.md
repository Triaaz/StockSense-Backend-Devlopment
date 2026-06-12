# StockSense Backend API Documentation

## Base URL

Development:
http://localhost:5000/api

Note: For frontend integration on separate machines, a deployed URL or tunnel URL will be provided.

---

# Authentication

## Register User

Method: POST
Endpoint: `/auth/register`

Body:
{
"name": "",
"email": "",
"phone": "",
"password": "",
"role": ""
}

## Login

Method: POST
Endpoint: `/auth/login`

Body:
{
"email": "",
"password": ""
}

Response:
{
"token": "",
"user": {}
}

---

# User Management

Method | Endpoint | Description
GET | /users | Get all users
GET | /users/:id | Get a single user
PUT | /users/:id | Update a user
DELETE | /users/:id | Delete a user

---

# Suppliers

Method | Endpoint | Description
POST | /suppliers | Create supplier
GET | /suppliers | Get all suppliers
GET | /suppliers/:id | Get one supplier
PUT | /suppliers/:id | Update supplier
DELETE | /suppliers/:id | Delete supplier

Create Supplier Body:
{
"name": "Supplier Name",
"email": "[supplier@email.com](mailto:supplier@email.com)",
"phone": "08012345678",
"address": "Address",
"contactPerson": "Contact Name"
}

---

# Categories

Method | Endpoint | Description
POST | /categories | Create category
GET | /categories | Get all categories
GET | /categories/:id | Get one category
PUT | /categories/:id | Update category
DELETE | /categories/:id | Delete category

---

# Products

Method | Endpoint | Description
POST | /products | Create product
GET | /products | Get all products
GET | /products/:id | Get one product
PUT | /products/:id | Update product
DELETE | /products/:id | Delete product

Create Product Body:
{
"name": "Product Name",
"description": "",
"category": "category-id",
"supplierLink": "supplier-id",
"costPrice": 1000,
"sellingPrice": 1200,
"openingStock": 100,
"currentStock": 100,
"reorderLevel": 5,
"unitOfMeasure": "pcs",
"expiryDate": "2026-12-31",
"sku": "SKU001"
}

---

# Purchase Orders

Method | Endpoint | Description
POST | /purchase-orders | Create order
GET | /purchase-orders | Get all orders
GET | /purchase-orders/:id | Get one order
PUT | /purchase-orders/:id | Update order
DELETE | /purchase-orders/:id | Delete order

Create Order Body:
{
"supplier": "supplier-id",
"products": [
{
"product": "product-id",
"quantity": 10,
"unitPrice": 5000
}
],
"expectedDeliveryDate": "2026-06-15",
"notes": "Urgent"
}

---

# Business Profile

Method | Endpoint | Description
GET | /profile | Get business profile
PUT | /profile | Create or update profile

---

# Inventory Management

Method | Endpoint | Description
POST | /inventory/stock-in | Add stock
POST | /inventory/stock-out | Remove stock
PUT | /inventory/update | Update inventory quantity
GET | /inventory/history | Get inventory history

Stock In Body:
{
"productId": "product-id",
"quantity": 50
}

Stock Out Body:
{
"productId": "product-id",
"quantity": 20
}

---

# Sales System

Method | Endpoint | Description
POST | /sales | Record sale
GET | /sales/history | Get sales history
PUT | /sales/:saleId/void | Void sale
GET | /sales/summary/daily | Daily sales summary
GET | /sales/attendant/:attendantId | Get sales by attendant

Record Sale Body:
{
"attendantId": "user-id",
"items": [
{
"productId": "product-id",
"quantity": 2
}
]}

---

# Alerts

Method | Endpoint | Description
POST | /alerts/check | Run low stock check
POST | /alerts/check-expiry | Run expiry check
GET | /alerts | Get all alerts
GET | /alerts?isRead=false | Get unread alerts
GET | /alerts/summary | Get alert summary
PUT | /alerts/:id/read | Mark alert as read
PUT | /alerts/read-all | Mark all alerts as read
DELETE | /alerts/:id | Delete alert

---

# Reports & Dashboard

Method | Endpoint | Description
GET | /reports/summary | Dashboard summary
GET | /reports/low-stock | Low stock products
GET | /reports/order-status | Orders grouped by status
GET | /reports/recent-orders | Last five orders
GET | /reports/supplier-performance | Supplier statistics

---

# General Error Responses

All errors return:

{
"message": "Error description",
"error": "Detailed error"
}

Common Status Codes:

400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
500 - Server Error

---

# Current Backend Coverage

Completed Modules:

* Authentication
* User Management
* Suppliers
* Categories
* Products
* Purchase Orders
* Business Profile
* Inventory Management
* Sales System
* Alerts
* Reports & Dashboard
* Audit Logs

Remaining Backend Improvements:

* Middleware & Validation
* Offline Sync Support
* Barcode Support
  }

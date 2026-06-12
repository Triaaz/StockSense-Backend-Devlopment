# StockSense Backend – Postman Testing Guide

## Setup

### Base URL

```
http://localhost:5000/api
```

### Start Server

```bash
npm run dev
```

---

# 1. Authentication

## Register User

**POST** `/auth/register`

Expected: 201 Created

## Login User

**POST** `/auth/login`

Expected: 200 OK
Response:

```json
{
  "token": "",
  "user": {}
}
```

---

# 2. Users

## Get All Users

**GET** `/users`

## Get User

**GET** `/users/:id`

## Update User

**PUT** `/users/:id`

## Delete User

**DELETE** `/users/:id`

---

# 3. Suppliers

## Create Supplier

**POST** `/suppliers`

## Get All Suppliers

**GET** `/suppliers`

## Get Supplier

**GET** `/suppliers/:id`

## Update Supplier

**PUT** `/suppliers/:id`

## Delete Supplier

**DELETE** `/suppliers/:id`

---

# 4. Categories

## Create Category

**POST** `/categories`

## Get Categories

**GET** `/categories`

## Get Category

**GET** `/categories/:id`

## Update Category

**PUT** `/categories/:id`

## Delete Category

**DELETE** `/categories/:id`

---

# 5. Products

## Create Product

**POST** `/products`

## Get Products

**GET** `/products`

## Get Product

**GET** `/products/:id`

## Update Product

**PUT** `/products/:id`

## Delete Product

**DELETE** `/products/:id`

---

# 6. Inventory Management

## Stock In

**POST** `/inventory/stock-in`

## Stock Out

**POST** `/inventory/stock-out`

## Update Inventory

**PUT** `/inventory/update`

## Inventory History

**GET** `/inventory/history`

---

# 7. Purchase Orders

## Create Order

**POST** `/purchase-orders`

## Get Orders

**GET** `/purchase-orders`

## Get Order

**GET** `/purchase-orders/:id`

## Update Order

**PUT** `/purchase-orders/:id`

## Delete Order

**DELETE** `/purchase-orders/:id`

---

# 8. Sales System

## Record Sale

**POST** `/sales`

## Sales History

**GET** `/sales/history`

## Sales by Attendant

**GET** `/sales/attendant/:attendantId`

## Void Sale

**PUT** `/sales/:id/void`

## Daily Summary

**GET** `/sales/summary/daily`

---

# 9. Business Profile

## Get Profile

**GET** `/profile`

## Update Profile

**PUT** `/profile`

---

# 10. Alerts

## Run Low Stock Check

**POST** `/alerts/check`

## Run Expiry Check

**POST** `/alerts/check-expiry`

## Get Alerts

**GET** `/alerts`

## Unread Alerts

**GET** `/alerts?isRead=false`

## Alert Summary

**GET** `/alerts/summary`

## Mark as Read

**PUT** `/alerts/:id/read`

## Mark All Read

**PUT** `/alerts/read-all`

## Delete Alert

**DELETE** `/alerts/:id`

---

# 11. Reports & Dashboard

## Summary

**GET** `/reports/summary`

## Low Stock Products

**GET** `/reports/low-stock`

## Order Status

**GET** `/reports/order-status`

## Recent Orders

**GET** `/reports/recent-orders`

## Supplier Performance

**GET** `/reports/supplier-performance`

---

# 12. Error Format

All errors return:

```json
{
  "message": "Error description",
  "error": "Detailed error"
}
```

---

# 13. Status Codes

* 200 → OK
* 201 → Created
* 400 → Bad Request
* 401 → Unauthorized
* 404 → Not Found
* 500 → Server Error

---

# 14. Notes for Frontend Team

* Base URL will change after deployment (Render)
* All protected routes require:

```
Authorization: Bearer <token>
```

* MongoDB is not accessed directly by frontend
* All inventory & sales updates are real-time via API

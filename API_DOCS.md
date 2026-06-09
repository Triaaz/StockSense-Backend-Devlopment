# StockSense API Documentation

## Base URL
http://localhost:5000/api

---

## Authentication

### Register
- POST /api/auth/register
- Body: { "name": "", "email": "", "phone": "", "password": "", "role": "" }

### Login
- POST /api/auth/login
- Body: { "email": "", "password": "" }
- Returns: { "token": "", "user": {} }

---

## Suppliers

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/suppliers | Create supplier |
| GET | /api/suppliers | Get all suppliers |
| GET | /api/suppliers/:id | Get one supplier |
| PUT | /api/suppliers/:id | Update supplier |
| DELETE | /api/suppliers/:id | Delete supplier |

### Create Supplier Body
{
    "name": "Supplier Name",
    "email": "supplier@email.com",
    "phone": "08012345678",
    "address": "Address",
    "contactPerson": "Contact Name"
}

---

## Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/products | Create product |
| GET | /api/products | Get all products |

### Create Product Body
{
    "name": "Product Name",
    "price": 5000,
    "quantity": 100,
    "supplier": "supplier-id"
}

---

## Purchase Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/purchase-orders | Create order |
| GET | /api/purchase-orders | Get all orders |
| GET | /api/purchase-orders/:id | Get one order |
| PUT | /api/purchase-orders/:id | Update order |
| DELETE | /api/purchase-orders/:id | Delete order |

### Create Order Body
{
    "supplier": "supplier-id",
    "products": [{ "product": "product-id", "quantity": 10, "unitPrice": 5000 }],
    "expectedDeliveryDate": "2026-06-15",
    "notes": "Urgent"
}

---

## Business Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/profile | Get profile |
| PUT | /api/profile | Create/Update profile |

---

## Alerts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/alerts/check | Run low stock check |
| POST | /api/alerts/check-expiry | Run expiry check |
| GET | /api/alerts | Get all alerts |
| GET | /api/alerts?isRead=false | Get unread alerts |
| GET | /api/alerts/summary | Alert summary |
| PUT | /api/alerts/:id/read | Mark one as read |
| PUT | /api/alerts/read-all | Mark all as read |
| DELETE | /api/alerts/:id | Delete alert |

---

## Reports & Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/reports/summary | Dashboard summary |
| GET | /api/reports/low-stock | Low stock products |
| GET | /api/reports/order-status | Orders by status |
| GET | /api/reports/recent-orders | Last 5 orders |
| GET | /api/reports/supplier-performance | Supplier stats |

---

## Error Responses

All errors return:
{
    "message": "Error description",
    "error": "Detailed error"
}

Status codes: 400 (bad request), 404 (not found), 500 (server error)
# StockSense API Documentation

## Base URL
`http://localhost:5000/api`

---

## Authentication

### Register
- **POST** `/api/auth/register`
- Body: `{ "name": "", "email": "", "phone": "", "password": "", "role": "" }`

### Login
- **POST** `/api/auth/login`
- Body: `{ "email": "", "password": "" }`
- Returns: `{ "token": "", "user": {} }`

---

## Suppliers

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/suppliers` | Create supplier |
| GET | `/api/suppliers` | Get all suppliers |
| GET | `/api/suppliers/:id` | Get one supplier |
| PUT | `/api/suppliers/:id` | Update supplier |
| DELETE | `/api/suppliers/:id` | Delete supplier |

### Create Supplier Body
```json
{
    "name": "Supplier Name",
    "email": "supplier@email.com",
    "phone": "08012345678",
    "address": "Address",
    "contactPerson": "Contact Name"
}
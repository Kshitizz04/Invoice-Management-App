# Invoice Management Application

This is a full-stack web application for managing invoices with features like filtering, searching, and user validation. The project is built using **React** for the frontend and **Node.js** with **MongoDB** for the backend.

---

## **Features**
- **User Validation**:  Login with timezone validation.
- **Invoice Management**: Create, update, delete, and retrieve invoices.
- **Filtering & Search**: Filter invoices by financial year, date range, and invoice number.
- **Validation**: Unique invoice numbers within each financial year, date alignment checks.

---

## **Tech Stack**
- **Frontend**: React, Axios, React Router, Material UI.
- **Backend**: Node.js, Express, MongoDB Atlas.
- **Deployment**: Vercel (Frontend), Render (Backend).

---

## **Live Demo**
- **Frontend**: https://invoice-management-app-vert.vercel.app/
- **Backend**: https://invoice-management-app-2gbe.onrender.com/

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/invoice-management.git
cd invoice-management
```

### **2. Backend Setup**

```bash
cd backend
npm install
npm start
```

### **3. Frontend Setup**

```bash
cd frontend
npm install
npm start
```

---

## **Project structure**

```bash
invoice-management/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## **API Endpoints**

| Method | Endpoint                          | Description                                   | Request Body Example                                                                 |
|--------|-----------------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------|
| POST   | `/api/invoices/create`             | Create a new invoice.                         | `{ "invoiceNumber": "INV001", "invoiceDate": "2024-12-01", "invoiceAmount": 1500, "financialYear": "2024-2025" }` |
| PUT    | `/api/invoices/:id`                | Update an existing invoice by ID.             | `{ "invoiceAmount": 2000 }`                                                          |
| DELETE | `/api/invoices/:id`                | Delete an invoice by ID.                      | None                                                                                 |
| GET    | `/api/invoices`                    | Retrieve all invoices.                        | None                                                                                 |
| GET    | `/api/invoices?year=YYYY`          | Filter invoices by financial year.            | None                                                                                 |
| GET    | `/api/invoices/search/:invoiceNumber` | Search invoices by invoice number.          | None                                                                                 |

---

## **License**
This project is licensed under the MIT License.
You are free to use, modify, and distribute the code as long as the original license is included.


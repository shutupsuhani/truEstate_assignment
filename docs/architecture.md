📌 Architecture Overview – Sales Management System

1. System Overview

The Sales Management System is a full-stack MERN application designed to manage and visualize sales transactions.
It supports search, filtering, sorting, pagination, and analytics (stats cards) on sales records.

2. High-Level Architecture

┌────────────┐      HTTP/REST API       ┌────────────────────┐
│  Frontend  │  ─────────────────────▶  │      Backend        │
│  (React)   │                          │   (Node + Express)  │
└────────────┘      JSON Response       └────────────────────┘
        │                                        │
        │                                        ▼
        │                                 ┌─────────────┐
        │                                 │  Database    │
        └──────────────────────────────▶  │ (MongoDB)    │
                                          └─────────────┘

3. Frontend Architecture (React + TypeScript + Vite)
  
| Component             | Responsibility                                               |
| --------------------- | ------------------------------------------------------------ |
| **Header**            | Filters, search input & sorting dropdown                     |
| **Sidebar**           | UI navigation menu                                           |
| **StatsCards**        | Shows sales KPIs (units sold, total revenue, total discount) |
| **TransactionsTable** | Displays paginated table of transactions                     |
| **Pagination**        | Page navigation control                                      |
| **App.tsx**           | Holds global state, fetches data & communicates with backend |

4. State Management

React useState & useEffect
Lifts filter state from Header to App.tsx
API called on filter or pagination change

5. API Call Flow
User interacts with filters
        ↓
Header updates filters
        ↓
App.tsx calls backend: /sales?search=&region=&page=1&sortBy=
        ↓
Backend responds with { data, total, totalPages }
        ↓
UI renders table + stats + pagination

6.  Backend Architecture (Node.js + Express + Mongoose)
🔥 Key Endpoint
GET /sales

| Query               | Purpose                        |
| ------------------- | ------------------------------ |
| search              | Name or Phone full-text search |
| region              | Multi-select                   |
| gender              | Multi-select                   |
| ageMin / ageMax     | Range filtering                |
| productCategory     | Multi-select                   |
| tags                | Multi-select                   |
| paymentMethod       | Multi-select                   |
| dateStart / dateEnd | Date range                     |
| sortBy              | Sorting                        |
| page + pageSize     | Pagination                     |


7. Database Architecture (MongoDB)
Collection: sales

Each document contains fields like:

Transaction ID
Customer Name
Phone Number
Gender
Age
Customer Region
Product Category
Quantity
Price per Unit
Discount Percentage
Total Amount
Final Amount
Payment Method
Order Status
Delivery Type
Store Location
Employee Name

✅ Final Outcome

The architecture ensures:
✔ Fast and accurate search
✔ Multi-filters working together
✔ Sorting without losing filter state
✔ Smooth pagination
✔ Accurate statistics display
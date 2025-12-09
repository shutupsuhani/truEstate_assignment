🧾 Sales Dashboard — Full Stack Assignment

This project is a Full-stack Sales Analytics Dashboard designed to visualize transactional data with search, filtering, sorting and pagination support.

The dashboard displays daily sales transactions, calculates key statistics, and allows users to explore large datasets efficiently.

🚀 Tech Stack
Layer	Technology
Frontend	React + TypeScript + Tailwind CSS
Icons	Lucide-React
Backend	Node.js + Express
Database	MongoDB
API Format	REST API (JSON)
📌 Features
🔹 Dashboard

Displays paginated list of sales transactions

Dynamic statistics cards:

Total Units Sold

Total Amount

Total Discount

🔹 Transactions Table

10 rows per page

Shows all attributes like:

Transaction ID, Date, Customer Name, Product Category, Quantity, Final Amount, Payment Method, Order Status and more

🔹 Filters & Search

Search by Customer Name / Transaction ID

Filter by:

Region / Gender

Age Range

Product Category

Payment Method

Date Range

Sort by any column (optional)

🔹 Error & Loading Handling

Skeleton loader while fetching

Error alert with Retry option if API fails


🔗 API Endpoint
Method	Endpoint	Description
GET	/sales	Fetch all sales with filters + pagination
Example Request
GET http://localhost:5000/sales?page=1&pageSize=10&search=John&paymentMethod=Cash

Example Response
{
  "total": 1000,
  "totalPages": 100,
  "page": 1,
  "pageSize": 10,
  "data": [ ...transactions ]
}

🖥️ Running the Project

- clone the repo

1️⃣ Start Backend
cd backend
npm install
npm start

Create .env
MONGO_URI=your_mongodb_connection_string
PORT=5000

2️⃣ Start Frontend
cd frontend
npm install
npm run dev

📊 Dataset

The dataset contains real-world-style sales attributes like:

Transaction ID

Customer Name & Phone

Age / Gender

Product Category

Quantity, Price, Discount, Final Amount

Payment Method

Order Status

Store Location

Employee Name

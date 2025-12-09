const mongoose=require('mongoose');

const salesSchema = new mongoose.Schema({
  "Transaction ID": String,
  "Date": String,
  "Customer ID": String,
  "Customer Name": String,
  "Phone Number": String,
  "Gender": String,
  "Age": String,
  "Customer Region": String,
  "Customer Type": String,
  "Product ID": String,
  "Product Name": String,
  "Brand": String,
  "Product Category": String,
  "Tags": String,
  "Quantity": String,
  "Price per Unit": String,
  "Discount Percentage": String,
  "Total Amount": String,
  "Final Amount": String,
  "Payment Method": String,
  "Order Status": String,
  "Delivery Type": String,
  "Store ID": String,
  "Store Location": String,
  "Salesperson ID": String,
  "Employee Name": String
});

module.exports = mongoose.model("Sale", salesSchema);

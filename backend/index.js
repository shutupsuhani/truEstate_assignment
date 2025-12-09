const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const salesRoutes = require('./src/routes/salesRoutes.js');
require("dotenv").config();
const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Connection Error: ", err));

app.use(cors());
app.use(express.json());

app.use("/sales", salesRoutes);

app.get('/', (req, res) => {
    res.send("Backend is working");
});

const port = 5000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

const express = require("express");
const { getFilteredSales } = require("../controllers/salesController");

const router = express.Router();

router.get("/", getFilteredSales);

module.exports = router;

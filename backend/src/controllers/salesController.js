const Sales = require("../models/Sales");

const splitList = (val) =>
  val ? val.split(",").map((s) => s.trim()).filter(Boolean) : null;

exports.getAllSales = async (req, res) => {
  try {
    const data = await Sales.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load sales data" });
  }
};

exports.getFilteredSales = async (req, res) => {
   try {
    let {
      search,
      region,
      gender,
      ageMin,
      ageMax,
      productCategory,
      tags,
      paymentMethod,
      dateStart,
      dateEnd,
      sortBy,
      page,
      pageSize
    } = req.query;

    page = Math.max(1, Number(page) || 1);
    pageSize = Math.max(1, Math.min(100, Number(pageSize) || 10));

    const match = {};

    if (search) {
      const s = search.trim();
      match.$or = [
        { "Customer Name": { $regex: s, $options: "i" } },
        { "Phone Number": { $regex: s, $options: "i" } }
      ];
    }

    const splitList = (v) => v ? v.split(",").map(i => i.trim()) : null;

    if (region) match["Customer Region"] = { $in: splitList(region) };
    if (gender) match["Gender"] = { $in: splitList(gender) };
    if (productCategory) match["Product Category"] = { $in: splitList(productCategory) };
    if (paymentMethod) match["Payment Method"] = { $in: splitList(paymentMethod) };

    if (ageMin || ageMax) {
      match["Age"] = {};
      if (ageMin) match["Age"].$gte = Number(ageMin);
      if (ageMax) match["Age"].$lte = Number(ageMax);
    }

    if (dateStart || dateEnd) {
      match["Date"] = {};
      if (dateStart) match["Date"].$gte = new Date(dateStart);
      if (dateEnd) match["Date"].$lte = new Date(dateEnd);
    }

    const sort = {};
    if (sortBy === "date") sort["Date"] = -1;
    else if (sortBy === "quantity") sort["Quantity"] = -1;
    else if (sortBy === "name") sort["Customer Name"] = 1;
    else sort["_id"] = 1;

    const pipeline = [
      { $match: match },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $sort: sort },
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize }
          ]
        }
      }
    ];

    const result = await Sales.aggregate(pipeline);
    const total = result[0].metadata[0]?.total || 0;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return res.status(200).json({
      total,
      page,
      pageSize,
      totalPages,
      data: result[0].data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process request" });
  }
};

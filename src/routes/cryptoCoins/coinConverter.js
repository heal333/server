const express = require("express");

const router = express.Router();

router.get("/convert", async (req, res) => {
    const response = await fetch(
        `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=${req.query.amount}&id=${req.query.fromid}&convert_id=${req.query.toid}`,
        {
            headers: {
                "X-CMC_PRO_API_KEY": process.env.KEY,
            },
        }
    );
    const result = await response.json();
    res.status(200).json(result);
});

module.exports = router;

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ youGot: "rooted" });
});

router.get("/coins", async (req, res) => {
    const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50`,
        {
            headers: {
                "X-CMC_PRO_API_KEY": process.env.KEY,
            },
        }
    );
    const result = await response.json();
    res.status(200).json(result);
});

router.get("/getCoinData", async (req, res) => {
    const response = await fetch(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${req.query.id}`,
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

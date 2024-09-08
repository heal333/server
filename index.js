const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());

dotenv.config({ path: "./config.env" });

const PORT = 4000;

app.listen(PORT, () => {
    console.log("listening on port: ", PORT);
});

app.get("/", (req, res) => {
    res.status(200).json({ youGot: "rooted" });
});
app.get("/coins", async (req, res) => {
    const response = await fetch(`${process.env.API}/latest?limit=50`, {
        headers: {
            "X-CMC_PRO_API_KEY": process.env.KEY,
        },
    });
    const result = await response.json();
    res.status(200).json(result);
});
app.get("/getCoinData", async (req, res) => {
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

app.get("/convert", async (req, res) => {
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

app.get("/test", async (req, res) => {
    // const response = await fetch(
    //     `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?id=1`,
    //     {
    //         headers: {
    //             "X-CMC_PRO_API_KEY": process.env.KEY,
    //         },
    //     }
    // );
    // const result = await response.json();
    // res.status(200).json(result);
});

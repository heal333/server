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

app.get("/coins", async (req, res) => {
    const response = await fetch(`${process.env.API}?limit=50`, {
        headers: {
            "X-CMC_PRO_API_KEY": process.env.KEY,
        },
    });
    const result = await response.json();
    res.status(200).json(result);
});

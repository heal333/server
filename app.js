const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const allCoinsRoutes = require("./src/routes/cryptoCoins/allCoins");
const convertCoinRoutes = require("./src/routes/cryptoCoins/coinConverter");
const type0Route = require("./src/routes/type0/type0");
dotenv.config({ path: "./config.env" });

const PORT = 3000;
const port = 3000;
const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then((con) => {
        console.log("succesfully connected with the database");
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(
            "failed to connect to the database or could error in port listing too idk or maybe the build in render failed"
        );
        console.log(error);
    });

//for crypto coins
app.use("/cryptoCoins/API", allCoinsRoutes); //to get the list of all crypto currencies with details;
app.use("/cryptoCoins/API", convertCoinRoutes);

//for type0
app.use("/type0/API", type0Route);

const express = require("express");
const logger = require("morgan")
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const envelopesRouter = require("./routes/envelopes.route");
const transactionsRouter = require("./routes/transactions.route");

const app = express();

app.use(logger("dev"))
app.use(express.json())

app.use("/api/v1/envelopes", envelopesRouter);
app.use("/api/v1/transactions", transactionsRouter);

module.exports = app
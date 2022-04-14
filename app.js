const express = require("express");
const logger = require("morgan")
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const envelopesRouter = require("./routes/envelopes.route");

const app = express();

app.use(logger("dev"))
app.use(express.json())

app.use("/api/v1/envelopes", envelopesRouter);

module.exports = app
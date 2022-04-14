const express = require("express");
const router = express.Router();

const {
  getEnvelopes,
  getEnvelopeById,
  addEnvelope,
  updateEnvelope,
  deleteEnvelope,
  getEnvelopesTransactions,
  addEnvelopeTransaction
} = require("../controllers/envelopes.controller");

router.get("/", getEnvelopes);
router.get("/:id", getEnvelopeById);
router.post("/", addEnvelope)
router.put("/:id", updateEnvelope)
router.delete("/:id", deleteEnvelope)
router.get("/:id/transactions", getEnvelopesTransactions)
router.post("/:id/transactions", addEnvelopeTransaction)

module.exports = router;

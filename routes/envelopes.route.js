const express = require("express");
const router = express.Router();

const {
  getEnvelopes,
  getEnvelopeById,
  addEnvelope,
  updateEnvelope,
  deleteEnvelope
} = require("../controllers/envelopes.controller");

router.get("/", getEnvelopes);
router.get("/:id", getEnvelopeById);
router.post("/", addEnvelope)
router.put("/:id", updateEnvelope)
router.delete("/:id", deleteEnvelope)

module.exports = router;

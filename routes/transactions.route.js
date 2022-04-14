const express = require("express");
const router = express.Router();

const {
  getTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactions.controller");

router.get("/", getTransaction);
router.get("/:id", getTransactionById);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;

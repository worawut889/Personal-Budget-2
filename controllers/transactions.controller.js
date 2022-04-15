const { db } = require("../config/db");

const getTransaction = async (req, res) => {
  const query = "SELECT * FROM transactions";

  try {
    const transactions = await db.query(query);
    if (transactions.rowCount < 1) {
      return res.status(404).send({
        message: "Not found transaction",
      });
    }
    res.send({
      status: "Success",
      message: "Transaction information retrieved",
      data: transactions.rows,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM transactions WHERE id = $1";

  try {
    const transaction = await db.query(query, [id]);
    if (transaction.rowCount < 1) {
      return res.status(404).send({
        message: "Not found transaction",
      });
    }
    res.send({
      status: "Success",
      message: "Transaction information retrieved",
      data: transaction.rows[0],
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  const prevTransaction = "SELECT amount FROM transactions WHERE id = $1",
    updateTransactionQuery =
      "UPDATE transactions SET title = $1, amount = $2 WHERE id = $3 RETURNING *",
    updateEnvelopeQuery =
      "UPDATE envelopes SET budget = (budget + $1) - $2 WHERE id IN (SELECT envelope_id FROM transactions WHERE id = $3)";

  try {
    const transaction = await db.query(prevTransaction, [id]);
    if (transaction.rowCount < 1) {
      return res.status(404).send({
        message: "Not found transaction",
      });
    }
    await db.query(updateEnvelopeQuery, [
      transaction.rows[0].amount,
      amount,
      id,
    ]);

    const updatedTransaction = await db.query(updateTransactionQuery, [
      title,
      amount,
      id,
    ]);
    res.status(201).send({
      status: "Success",
      message: "Transaction updated",
      data: updatedTransaction.rows[0],
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const deleteTransactionQuery = "DELETE FROM transactions WHERE id = $1",
    transactionQuery = "SELECT * FROM transactions WHERE id = $1",
    updatedEnvelopeQuery = "UPDATE envelopes SET budget = budget + $1 WHERE id IN (SELECT envelope_id FROM transactions WHERE id = $2)";
  try {
    const transaction = await db.query(transactionQuery, [id]);
    if (transaction.rowCount < 1) {
      return res.status(404).send({
        message: "Not found transaction",
      });
    }
    await db.query(updatedEnvelopeQuery, [transaction.rows[0].amount, id])
    await db.query(deleteTransactionQuery, [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  getTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};

const { db } = require("../config/db");

const getTransaction = async (req, res) => {
  const query = "SELECT * FROM transactions";

  const transactions = await db.query(query);
  res.send(transactions.rows);
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM transactions WHERE id = $1";

  const transaction = await db.query(query, [id]);
  res.send(transaction.rows[0]);
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  const query =
    "UPDATE transactions SET title = $1, amount = $2 WHERE id = $3 RETURNING *";

  const transaction = await db.query(query, [title, amount, id]);
  res.status(201).send(transaction.rows[0]);
}

const deleteTransaction = async (req, res) => {
  const { id } = req.params
  const query = "DELETE FROM transactions WHERE id = $1"
  await db.query(query, [id])
  res.sendStatus(204)
}

module.exports = {
  getTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};

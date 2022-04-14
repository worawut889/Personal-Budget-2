const { db } = require("../config/db");

const getEnvelopes = async (req, res) => {
  const envelopes = await db.query("SELECT * FROM envelopes");
  if (envelopes.rowCount < 1) {
  }
  res.send(envelopes.rows);
};

const getEnvelopeById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM envelopes WHERE id = $1";

  const envelope = await db.query(query, [id]);
  res.send(envelope.rows[0]);
};

const addEnvelope = async (req, res) => {
  const { title, budget } = req.body;
  const query =
    "INSERT INTO envelopes (title, budget) VALUES ($1, $2) RETURNING *";
  const envelope = await db.query(query, [title, budget]);
  res.status(201).send(envelope.rows[0]);
};

const updateEnvelope = async (req, res) => {
  const { id } = req.params;
  const { title, budget } = req.body;
  const query =
    "UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3 RETURNING *";

  const envelope = await db.query(query, [title, budget, id]);
  res.status(201).send(envelope.rows[0]);
};

const deleteEnvelope = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM envelopes WHERE id = $1";
  await db.query(query, [id]);
  res.sendStatus(204);
};

const getEnvelopesTransactions = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM transactions WHERE envelope_id = $1";

  const transactions = await db.query(query, [id]);
  res.send(transactions.rows);
};

const addEnvelopeTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  const envelopeQuery = "SELECT * FROM envelopes WHERE id = $1",
    addTransactionQuery =
      "INSERT INTO transactions (title, amount, envelope_id) VALUES ($1, $2, $3) RETURNING *",
    updateEnvelopeQuery =
      "UPDATE envelopes SET budget = budget - $1 WHERE id = $2";

  try {
    const envelope = await db.query(envelopeQuery, [id]);
    if (envelope.rowCount < 1) {
      throw new Error("Not found envelope");
    }
    await db.query(updateEnvelopeQuery, [amount, id]);
    const transaction = await db.query(addTransactionQuery, [
      title,
      amount,
      id,
    ]);
    res.send(transaction.rows[0]);
  } catch (error) {
    res.status(404).send({error: error.message});
  }
};

module.exports = {
  getEnvelopes,
  getEnvelopeById,
  addEnvelope,
  updateEnvelope,
  deleteEnvelope,
  getEnvelopesTransactions,
  addEnvelopeTransaction,
};

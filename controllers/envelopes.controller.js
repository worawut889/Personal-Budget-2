const { db } = require("../config/db");

const getEnvelopes = async (req, res) => {
  try {
    const envelopes = await db.query("SELECT * FROM envelopes");
    if (envelopes.rowCount < 1) {
      return res.status(404).send({
        message: "Not found envelope",
      });
    }
    res.send({
      status: "Success",
      message: "Envelope information retrieved",
      data: envelopes.rows,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getEnvelopeById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM envelopes WHERE id = $1";

  try {
    const envelope = await db.query(query, [id]);
    if (envelope.rowCount < 1) {
      return res.status(404).send({
        message: "Not found envelope",
      });
    }
    res.send({
      status: "Success",
      message: "Envelope information retrieved",
      data: envelope.rows[0],
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addEnvelope = async (req, res) => {
  const { title, budget } = req.body;
  const addEnvelopeQuery =
    "INSERT INTO envelopes (title, budget) VALUES ($1, $2) RETURNING *";
  try {
    const envelope = await db.query(addEnvelopeQuery, [title, budget]);
    res.status(201).send({
      status: "Success",
      message: "New envelope created",
      data: envelope.rows[0],
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateEnvelope = async (req, res) => {
  const { id } = req.params;
  const { title, budget } = req.body;
  const updateEnvelopeQuery =
      "UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3 RETURNING *",
    envelopeQuery = "SELECT * FROM envelopes WHERE id = $1";

  try {
    const envelope = await db.query(envelopeQuery, [id]);
    if (envelope.rowCount < 1) {
      return res.status(404).send({
        message: "Not found envelope",
      });
    }
    const updatedEnvelope = await db.query(updateEnvelopeQuery, [
      title,
      budget,
      id,
    ]);
    res.status(201).send({
      status: "Success",
      message: "Envelope updated",
      data: updatedEnvelope.rows[0],
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteEnvelope = async (req, res) => {
  const { id } = req.params;
  const deleteEnvelopequery = "DELETE FROM envelopes WHERE id = $1 RETURNING *",
    envelopeQuery = "SELECT * FROM envelopes WHERE id = $1";
  try {
    const envelope = await db.query(envelopeQuery, [id])
    if (envelope.rowCount < 1) {
      return res.status(404).send({
        message: "Not found envelope",
      });
    }
    await db.query(deleteEnvelopequery, [id]);
    res.sendStatus(204)
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getEnvelopesTransactions = async (req, res) => {
  const { id } = req.params;
  const transactionQueryByEId =
    "SELECT * FROM transactions WHERE envelope_id = $1";

  try {
    const transactions = await db.query(transactionQueryByEId, [id]);
    if (transactions.rowCount < 1) {
      res.status(404).send({
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
      return res.status(404).send({
        message: "Not found envelope",
      });
    }
    await db.query(updateEnvelopeQuery, [amount, id]);
    const transaction = await db.query(addTransactionQuery, [
      title,
      amount,
      id,
    ]);
    res.send({
      status: "Success",
      message: "New transaction created",
      data: transaction.rows[0],
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
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

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
  const { id } = req.params
  const query = "DELETE FROM envelopes WHERE id = $1"
  await db.query(query, [id])
  res.status(204).send("The envelope has been deleted")
}

module.exports = {
  getEnvelopes,
  getEnvelopeById,
  addEnvelope,
  updateEnvelope,
  deleteEnvelope
};

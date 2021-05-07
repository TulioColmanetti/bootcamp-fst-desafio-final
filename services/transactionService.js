const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

// GET route - returns all transactions according to query filter
const findTransactions = async (req, res, next) => {
  try {
    const { yearMonth } = req.query;

    if (!yearMonth)
      throw new Error(
        'É necessário informar o parâmetro do período "yearMonth", cujo valor deve estar no formato yyyy-mm'
      );

    // Here Mongoose adds an implicit $in when querying a non-array field with an array (Query Casting)
    const transactions = await TransactionModel.find({ yearMonth });

    res.send(transactions);
  } catch (err) {
    next(err);
  }
};

// POST route - create transactions
const createTransactions = async (req, res, next) => {
  try {
    const transactions = req.body;

    if (!transactions) throw new Error('Missing required information!');

    /*
    Performs an INSERT operation for one or more documents, no UPDATE
    model.create() calls 'new model(doc).save()' for every doc
    */
    const createdTransactions = await TransactionModel.create(transactions);

    res.send(createdTransactions);
  } catch (err) {
    next(err);
  }
};

// PUT route - update transaction
const updateTransaction = async (req, res, next) => {
  const transaction = req.body;

  if (!transaction) throw new Error('Missing required information!');

  const id = req.params.id;

  try {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    res.send(updatedTransaction);
  } catch (err) {
    next(err);
  }
};

// DELETE route - remove transaction
const removeTransaction = async (req, res, next) => {
  const id = req.params.id;

  try {
    const removedTransaction = await TransactionModel.findByIdAndRemove(id);

    // res.send(removedTransaction);
    res.send();
  } catch (err) {
    next(err);
  }
};

/*
 Always do this if an error occurred
 It will not run if res.send() or res.end() was called before
 */
const exceptionHandler = (err, _req, res, _next) => {
  res.status(400).send({ error: err.message });
};

module.exports = {
  findTransactions,
  createTransactions,
  updateTransaction,
  removeTransaction,
  exceptionHandler,
};

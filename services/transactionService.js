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

/*
 Always do this if an error occurred
 It will not run if res.send() or res.end() was called before
 */
const exceptionHandler = (err, _req, res, _next) => {
  res.status(400).send({ error: err.message });
};

module.exports = { findTransactions, exceptionHandler };

const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService');

transactionRouter.get('/', transactionService.findTransactions);

transactionRouter.use(transactionService.exceptionHandler);

module.exports = transactionRouter;

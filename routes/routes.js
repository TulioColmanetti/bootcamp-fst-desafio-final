const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService');

transactionRouter.get('/', transactionService.findTransactions);
transactionRouter.post('/', transactionService.createTransactions);
transactionRouter.put('/:id', transactionService.updateTransaction);
transactionRouter.delete('/:id', transactionService.removeTransaction);

transactionRouter.use(transactionService.exceptionHandler);

module.exports = transactionRouter;

import http from '../http-common';
import * as stringHelpers from '../helpers/stringHelpers';

const URL_TRANSACTION = `/api/transaction`;

const YEARS = [2019, 2020, 2021];

const MONTHS = [
  { description: 'Jan', month: 1 },
  { description: 'Fev', month: 2 },
  { description: 'Mar', month: 3 },
  { description: 'Abr', month: 4 },
  { description: 'Mai', month: 5 },
  { description: 'Jun', month: 6 },
  { description: 'Jul', month: 7 },
  { description: 'Ago', month: 8 },
  { description: 'Set', month: 9 },
  { description: 'Out', month: 10 },
  { description: 'Nov', month: 11 },
  { description: 'Dez', month: 12 },
];

function generatePeriods() {
  const yearMonthArray = [];
  let index = 1;
  for (const year of YEARS) {
    for (const month of MONTHS) {
      yearMonthArray.push({
        id: index,
        year,
        month: month.month,
        yearMonth:
          year.toString() + '-' + stringHelpers.formatDayMonth(month.month),
        description: month.description + '/' + year.toString(),
      });
      index++;
    }
  }
  // yearMonthArray.sort((a, b) => b.id - a.id);
  return yearMonthArray;
}

const ALL_PERIODS = generatePeriods();

const getTransactionsFrom = async (period) => {
  const transactions = await http.get(URL_TRANSACTION + `?yearMonth=${period}`);
  return transactions.data.sort((a, b) => a.day - b.day);
};

const createTransaction = async (transaction) => {
  const createdTransaction = await http.post(URL_TRANSACTION, transaction);
  return createdTransaction.data;
};

const updateTransaction = async (transaction) => {
  const id = transaction._id;
  // Create a copy of the transaction, to keep the original intact
  const newTransaction = Object.assign({}, transaction);
  /*
  Remove _id property from copied transaction, since it needs to be passed through URL
  Also, passing it through the body gives an conflict error on Backend
  */
  delete newTransaction._id;
  const updatedTransaction = await http.put(
    URL_TRANSACTION + `/${id}`,
    newTransaction
  );
  return updatedTransaction.data;
};

const removeTransaction = async (transaction) => {
  const id = transaction._id;
  await http.delete(URL_TRANSACTION + `/${id}`);
  return true;
};

export default {
  YEARS,
  MONTHS,
  ALL_PERIODS,
  getTransactionsFrom,
  createTransaction,
  updateTransaction,
  removeTransaction,
};

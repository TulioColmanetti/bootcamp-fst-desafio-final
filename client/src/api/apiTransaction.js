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

const getAll = async (query) => {
  return await http.get(URL_TRANSACTION + query);
};

const postTransaction = async (transaction) => {
  return await http.post(URL_TRANSACTION, transaction);
};

export default { YEARS, MONTHS, ALL_PERIODS, getAll, postTransaction };

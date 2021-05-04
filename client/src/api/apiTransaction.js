import http from '../http-common';

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

const getAll = async (query) => {
  return await http.get(URL_TRANSACTION + query);
};

export default { YEARS, MONTHS, getAll };

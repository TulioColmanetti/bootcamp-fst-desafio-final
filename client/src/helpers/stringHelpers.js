const currencyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatDayMonth(value) {
  return value.toString().padStart(2, '0');
}

export function formatNumberCurrency(value) {
  return currencyFormatter.format(value);
}

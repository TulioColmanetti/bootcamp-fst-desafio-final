import React from 'react';
import * as stringHelpers from '../helpers/stringHelpers.js';

export default function Summary({ children: transactions }) {
  const { titleStyle, containerStyle } = styles;
  return (
    <div style={containerStyle}>
      {SUMMARY.map(({ id, title, getValue, valueStyle }) => {
        return (
          <span key={id}>
            <span style={titleStyle}>{title}</span>
            <span style={valueStyle}>{getValue(transactions)}</span>
          </span>
        );
      })}
    </div>
  );
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '5px',
    padding: '8px',
    border: '1px solid grey',
    borderRadius: '5px',
  },

  titleStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },

  counterStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#2980b9',
  },

  positiveValueStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#27ae60',
  },

  negativeValueStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#e74c3c',
  },
};

const SUMMARY = [
  {
    id: 's1',
    title: 'Lançamentos: ',
    getValue: (transactions) => transactions.length,
    valueStyle: styles.counterStyle,
  },
  {
    id: 's2',
    title: 'Receitas: ',
    getValue: (transactions) =>
      stringHelpers.formatNumberCurrency(
        transactions
          .filter((transaction) => transaction.type === '+')
          .reduce((acc, curr) => acc + curr.value, 0)
      ),
    valueStyle: styles.positiveValueStyle,
  },
  {
    id: 's3',
    title: 'Despesas: ',
    getValue: (transactions) =>
      stringHelpers.formatNumberCurrency(
        transactions
          .filter((transaction) => transaction.type === '-')
          .reduce((acc, curr) => acc + curr.value, 0)
      ),
    valueStyle: styles.negativeValueStyle,
  },
  {
    id: 's4',
    title: 'Saldo: ',
    getValue: (transactions) =>
      stringHelpers.formatNumberCurrency(
        transactions.reduce((acc, curr) => {
          if (curr.type === '+') return acc + curr.value;
          else return acc - curr.value;
        }, 0)
      ),
    valueStyle: styles.positiveValueStyle,
  },
];

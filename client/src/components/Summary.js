import React from 'react';
import * as stringHelpers from '../helpers/stringHelpers.js';

export default function Summary({ children: transactions }) {
  const { titleStyle, containerStyle, dataPairStyle } = styles;
  return (
    <div style={containerStyle}>
      {SUMMARY.map(({ id, title, getValue, valueStyle }) => {
        let value = getValue(transactions);
        if (value < 0) valueStyle = styles.negativeValueStyle;
        if (id !== 's1') value = stringHelpers.formatNumberCurrency(value);
        return (
          <span key={id} style={dataPairStyle}>
            <span style={titleStyle}>{title}</span>
            <span style={valueStyle}>{value}</span>
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
    border: '1px solid #bdbdbd',
    borderRadius: '5px',
  },

  dataPairStyle: {
    overflow: 'hidden',
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
    color: '#00bfa5',
  },

  negativeValueStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#e57373',
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
      transactions
        .filter((transaction) => transaction.type === '+')
        .reduce((acc, curr) => acc + curr.value, 0),
    valueStyle: styles.positiveValueStyle,
  },
  {
    id: 's3',
    title: 'Despesas: ',
    getValue: (transactions) =>
      transactions
        .filter((transaction) => transaction.type === '-')
        .reduce((acc, curr) => acc + curr.value, 0),
    valueStyle: styles.negativeValueStyle,
  },
  {
    id: 's4',
    title: 'Saldo: ',
    getValue: (transactions) =>
      transactions.reduce((acc, curr) => {
        if (curr.type === '+') return acc + curr.value;
        else return acc - curr.value;
      }, 0),
    valueStyle: styles.positiveValueStyle,
  },
];

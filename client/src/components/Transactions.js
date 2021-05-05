import React from 'react';
import Transaction from './Transaction';

export default function Transactions({ children: transactions }) {
  return (
    <div>
      {transactions.map((transaction) => {
        return <Transaction key={transaction._id}>{transaction}</Transaction>;
      })}
    </div>
  );
}

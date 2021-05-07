import React from 'react';
import Transaction from './Transaction';

export default function Transactions({
  onTransactionClick,
  children: transactions,
}) {
  const handleActionClick = (id, type) => {
    onTransactionClick(id, type);
  };

  return (
    <div>
      {transactions.map((transaction) => {
        return (
          <Transaction key={transaction._id} onActionClick={handleActionClick}>
            {transaction}
          </Transaction>
        );
      })}
    </div>
  );
}

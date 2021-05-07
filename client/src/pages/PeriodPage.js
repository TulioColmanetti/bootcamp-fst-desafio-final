import React, { useEffect, useState } from 'react';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Select from '../components/Select.js';
import Summary from '../components/Summary.js';
import Filter from '../components/Filter.js';
import Transactions from '../components/Transactions.js';
import ModalTransaction from '../components/ModalTransaction.js';
import api from '../api/apiTransaction.js';
import * as stringHelpers from '../helpers/stringHelpers.js';

function getCurrentYear() {
  return new Date().getFullYear();
}

function getCurrentMonth() {
  return new Date().getMonth() + 1;
}

function generateCurrentPeriod() {
  return (
    getCurrentYear() + '-' + stringHelpers.formatDayMonth(getCurrentMonth())
  );
}

export default function PeriodPage() {
  const [selectedPeriod, setSelectedPeriod] = useState(generateCurrentPeriod());
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  useEffect(() => {
    const getAllTransactions = async () => {
      const allTransactions = await api.getTransactionsFrom(selectedPeriod);
      setTransactions(allTransactions);
    };
    getAllTransactions();
  }, [selectedPeriod]);

  const handleSelectedPeriod = (period) => {
    setSelectedPeriod(period);
  };

  const handlePersistData = async (newTransaction) => {
    let returnedTransaction = {};
    let newTransactions = Object.assign([], transactions);

    // If transaction does NOT have an _id property, then it is a new one, do POST
    if (!newTransaction._id) {
      returnedTransaction = await api.postTransaction(newTransaction);
      newTransactions.push(returnedTransaction);
    }
    // If transaction does have an _id property, then it is being edited, do UPDATE
    else {
      returnedTransaction = newTransaction;
      newTransactions = newTransactions.map((newTransaction) =>
        returnedTransaction._id === newTransaction._id
          ? returnedTransaction
          : newTransaction
      );
    }

    // Filter transactions inserted or updated with date out of current period
    newTransactions = newTransactions.filter(
      (newTransaction) => newTransaction.yearMonth === selectedPeriod
    );

    // Sort transactions with ascending day order
    newTransactions.sort((a, b) => a.day - b.day);

    setTransactions(newTransactions);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    setSelectedTransaction({});
    setIsModalOpen(true);
  };

  const handleTransactionClick = (id, type) => {
    const found = transactions.find((transaction) => transaction._id === id);

    setSelectedTransaction(found);

    let newTransactions = Object.assign([], transactions);

    // DELETE selected transaction
    if (type === 'delete') {
      // onDelete(selectedTransaction);

      newTransactions = newTransactions.filter(
        (transaction) => transaction._id !== id
      );
      newTransactions.sort((a, b) => a.day - b.day);

      setTransactions(newTransactions);
      return;
    }

    // Open modal for EDIT selected transaction
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <Header>Bootcamp Full Stack - Desafio Final</Header>
      <Main>
        {!isModalOpen && (
          <Select
            options={api.ALL_PERIODS}
            selectedValue={selectedPeriod}
            onSelect={handleSelectedPeriod}
          />
        )}
        <Summary>{transactions}</Summary>
        {!isModalOpen && (
          <button
            className="waves-effect waves-green btn"
            onClick={handleButtonClick}
          >
            + NOVO LANÇAMENTO
          </button>
        )}
        <Filter />
        {isModalOpen && (
          <ModalTransaction
            onSave={handlePersistData}
            onClose={handleModalClose}
          >
            {selectedTransaction}
          </ModalTransaction>
        )}
        <Transactions onTransactionClick={handleTransactionClick}>
          {transactions}
        </Transactions>
      </Main>
    </div>
  );
}

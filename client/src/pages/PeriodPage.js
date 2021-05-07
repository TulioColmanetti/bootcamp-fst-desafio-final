import React, { useEffect, useState } from 'react';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Select from '../components/Select.js';
import Summary from '../components/Summary.js';
import InputPanel from '../components/InputPanel.js';
import ModalTransaction from '../components/ModalTransaction.js';
import Transactions from '../components/Transactions.js';
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
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  useEffect(() => {
    const getAllTransactions = async () => {
      const res = await api.getTransactionsFrom(selectedPeriod);
      setAllTransactions(res);
      // setFilteredTransactions(res);
    };
    getAllTransactions();
  }, [selectedPeriod]);

  const handleSelectedPeriod = (period) => {
    setSelectedPeriod(period);
  };

  const handlePersistData = async (newTransaction) => {
    let returnedTransaction = {};
    let newTransactions = Object.assign([], allTransactions);

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

    setAllTransactions(newTransactions);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddButtonClick = () => {
    setSelectedTransaction({});
    setIsModalOpen(true);
  };

  const handleInputFilter = (filter) => {
    const found = allTransactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredTransactions(found);
  };

  const handleTransactionClick = (id, type) => {
    const found = allTransactions.find((transaction) => transaction._id === id);

    setSelectedTransaction(found);

    let newTransactions = Object.assign([], allTransactions);

    // DELETE selected transaction
    if (type === 'delete') {
      // onDelete(selectedTransaction);

      newTransactions = newTransactions.filter(
        (transaction) => transaction._id !== id
      );
      newTransactions.sort((a, b) => a.day - b.day);

      setAllTransactions(newTransactions);
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
        <Summary>{allTransactions}</Summary>
        {!isModalOpen && (
          <InputPanel
            onAddTransactionClick={handleAddButtonClick}
            onInputFilter={handleInputFilter}
          />
        )}
        {isModalOpen && (
          <ModalTransaction
            onSave={handlePersistData}
            onClose={handleModalClose}
          >
            {selectedTransaction}
          </ModalTransaction>
        )}
        <Transactions onTransactionClick={handleTransactionClick}>
          {allTransactions}
        </Transactions>
      </Main>
    </div>
  );
}

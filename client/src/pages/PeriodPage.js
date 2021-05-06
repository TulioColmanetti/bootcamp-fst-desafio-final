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
    const createdTransaction = await api.postTransaction(newTransaction);

    const newTransactions = Object.assign([], transactions);
    newTransactions.push(createdTransaction);
    newTransactions.sort((a, b) => a.day - b.day);

    setTransactions(newTransactions);

    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
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
            {}
          </ModalTransaction>
        )}
        <Transactions>{transactions}</Transactions>
      </Main>
    </div>
  );
}

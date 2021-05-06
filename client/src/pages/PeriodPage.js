import React, { useEffect, useState } from 'react';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Select from '../components/Select.js';
import Summary from '../components/Summary.js';
import Filter from '../components/Filter.js';
import Transactions from '../components/Transactions.js';
import api from '../api/apiTransaction.js';
import * as stringHelpers from '../helpers/stringHelpers.js';
import ModalTransaction from '../components/ModalTransaction.js';
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

  useEffect(() => {
    const getAllTransactions = async () => {
      const allTransactions = await api.getAll('?yearMonth=' + selectedPeriod);
      setTransactions(allTransactions.data);
    };
    getAllTransactions();
  }, [selectedPeriod]);

  const handleSelectedPeriod = (period) => {
    setSelectedPeriod(period);
  };

  const handlePersistData = async (newTransaction) => {
    const createdTransaction = await api.postTransaction(newTransaction);
    console.log(createdTransaction.data);
  };

  return (
    <div className="container">
      <Header>Bootcamp Full Stack - Desafio Final</Header>
      <Main>
        <Select
          options={api.ALL_PERIODS}
          selectedValue={selectedPeriod}
          onSelect={handleSelectedPeriod}
        />
        <Summary>{transactions}</Summary>
        <button data-target="modal1" className="btn modal-trigger">
          Modal
        </button>
        <ModalTransaction onSave={handlePersistData}>{}</ModalTransaction>
        <Filter />
        <Transactions>{transactions}</Transactions>
      </Main>
    </div>
  );
}

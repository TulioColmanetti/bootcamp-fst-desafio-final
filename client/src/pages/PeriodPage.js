import React, { useEffect, useState } from 'react';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Select from '../components/Select.js';
import Summary from '../components/Summary.js';
import Filter from '../components/Filter.js';
import Transactions from '../components/Transactions.js';
import api from '../api/apiTransaction.js';

export default function PeriodPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2019-01');
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

  return (
    <div className="container">
      <Header>Bootcamp Full Stack - Desafio Final</Header>
      <Main>
        <Select
          options={api.ALL_PERIODS}
          selectedValue={selectedPeriod}
          onSelect={handleSelectedPeriod}
        />
        <Summary />
        <Filter />
        <Transactions>{transactions}</Transactions>
      </Main>
    </div>
  );
}

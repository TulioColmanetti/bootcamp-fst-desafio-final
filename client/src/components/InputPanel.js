import React, { useState } from 'react';

export default function InputPanel({ onAddTransactionClick, onInputFilter }) {
  const [filter, setFilter] = useState('');

  const handleButtonClick = () => {
    onAddTransactionClick();
  };

  const handleOnChange = (event) => {
    setFilter(event.target.value);
    onInputFilter(event.target.value);
  };

  return (
    <div style={styles.inputPanel}>
      <button
        className="waves-effect waves-green btn"
        onClick={handleButtonClick}
      >
        <span style={{ fontSize: '1.1rem', marginRight: '5px' }}>+</span>
        <span>NOVO LANÇAMENTO</span>
      </button>
      <div className="input-field" style={styles.inputFilter}>
        <input
          id="inputFilter"
          name="filter"
          type="text"
          value={filter}
          onChange={handleOnChange}
        />
        <label className="active" htmlFor="inputFilter">
          Filtro
        </label>
      </div>
    </div>
  );
}

const styles = {
  inputPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '5px',
    marginRight: '5px',
  },

  inputFilter: {
    flex: 1,
    marginLeft: '15px',
  },
};

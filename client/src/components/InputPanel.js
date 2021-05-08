import React from 'react';

export default function InputPanel({
  textFilter,
  onAddTransactionClick,
  onChangeFilter,
}) {
  const handleButtonClick = () => {
    onAddTransactionClick();
  };

  const handleOnChange = (event) => {
    onChangeFilter(event.target.value);
  };

  return (
    <div style={styles.inputPanel}>
      <button className="btn" onClick={handleButtonClick}>
        <span style={{ fontSize: '1.1rem', marginRight: '5px' }}>+</span>
        <span>NOVO LANÇAMENTO</span>
      </button>
      <div className="input-field" style={styles.inputFilter}>
        <input
          id="inputFilter"
          name="filter"
          type="text"
          value={textFilter}
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
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '5px',
    marginRight: '5px',
  },

  inputFilter: {
    flex: 1,
    marginLeft: '15px',
  },
};

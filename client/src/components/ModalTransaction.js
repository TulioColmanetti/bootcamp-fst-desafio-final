import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import css from './modalTransaction.module.css';

Modal.setAppElement('#root');

const INITIAL_TRANSACTION = {
  description: '',
  value: 0,
  category: '',
  year: 2019,
  month: 1,
  day: 1,
  yearMonth: '',
  yearMonthDay: '2019-01-01',
  type: '+',
};

export default function ModalTransaction({
  onSave,
  onClose,
  children: initialTransaction = INITIAL_TRANSACTION,
}) {
  const [transaction, setTransaction] = useState(initialTransaction);
  const [disabledSaveButton, setDisabledSaveButton] = useState(true);

  const {
    title,
    flexRowTitle,
    flexColumn,
    flexRowRadio,
    flexRowInputDate,
    flexSaveButton,
  } = styles;

  useEffect(() => {
    if (transaction.description === '' || transaction.category === '')
      setDisabledSaveButton(true);
    else setDisabledSaveButton(false);
  }, [transaction]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const dateSplitted = transaction.yearMonthDay.split('-');
    const formattedTransaction = {
      ...transaction,
      value: parseFloat(transaction.value),
      year: parseInt(dateSplitted[0]),
      month: parseInt(dateSplitted[1]),
      day: parseInt(dateSplitted[2]),
      yearMonth: dateSplitted[0] + '-' + dateSplitted[1],
    };

    onSave(formattedTransaction);
  };

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleFocus = (event) => event.target.select();

  return (
    <div>
      <Modal isOpen={true} className={css.Modal} overlayClassName={css.Overlay}>
        <div>
          <div style={flexRowTitle}>
            <span style={title}>Adição de Transação</span>
            <button
              onClick={handleCloseButtonClick}
              className="waves-effect waves-lights btn red dark-4"
            >
              X
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div style={flexColumn}>
              <div style={flexRowRadio}>
                <label>
                  <input
                    name="type"
                    type="radio"
                    value="+"
                    checked={transaction.type === '+'}
                    onChange={handleOnChange}
                  />
                  <span>Receita</span>
                </label>
                <label>
                  <input
                    name="type"
                    type="radio"
                    value="-"
                    checked={transaction.type === '-'}
                    onChange={handleOnChange}
                  />
                  <span>Despesa</span>
                </label>
              </div>
              <div className="input-field">
                <input
                  name="description"
                  type="text"
                  value={transaction.description}
                  onChange={handleOnChange}
                />
                <label className="active" htmlFor="inputDesc">
                  Descrição:
                </label>
              </div>
              <div className="input-field">
                <input
                  name="category"
                  type="text"
                  value={transaction.category}
                  onChange={handleOnChange}
                />
                <label className="active" htmlFor="inputCateg">
                  Categoria:
                </label>
              </div>
              <div style={flexRowInputDate}>
                <div className="input-field">
                  <input
                    name="value"
                    type="number"
                    min="0"
                    step="0.1"
                    value={transaction.value}
                    onChange={handleOnChange}
                    onFocus={handleFocus}
                  />
                  <label className="active" htmlFor="inputValue">
                    Valor:
                  </label>
                </div>
                <div className="input-field">
                  <input
                    name="yearMonthDay"
                    type="date"
                    value={transaction.yearMonthDay}
                    onChange={handleOnChange}
                  />
                  <label className="active" htmlFor="inputDate">
                    Data:
                  </label>
                </div>
              </div>
            </div>
            <div style={flexSaveButton}>
              <button
                disabled={disabledSaveButton}
                type="submit"
                className="waves-effect waves-green btn"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  flexRowTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },

  flexRowInputDate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  flexRowRadio: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20px',
    marginBottom: '30px',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    padding: '10px',
    border: '1px solid #bdbdbd',
    borderRadius: '2px',
  },

  flexSaveButton: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '10px',
  },
};

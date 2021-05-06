import React, { useEffect, useState } from 'react';

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
  children: initialTransaction = INITIAL_TRANSACTION,
}) {
  const [transaction, setTransaction] = useState(INITIAL_TRANSACTION);
  const [disabledSaveButton, setDisabledSaveButton] = useState(true);

  // console.log(initialTransaction);

  useEffect(() => {
    if (transaction.description === '' || transaction.category === '')
      setDisabledSaveButton(true);
    else setDisabledSaveButton(false);
  }, [transaction]);

  const handleOnSaveButtonClick = () => {
    const dateSplitted = transaction.yearMonthDay.split('-');
    const formattedTransaction = {
      ...transaction,
      year: parseInt(dateSplitted[0]),
      month: parseInt(dateSplitted[1]),
      day: parseInt(dateSplitted[2]),
      yearMonth: dateSplitted[0] + '-' + dateSplitted[1],
    };
    console.log(formattedTransaction);
    // onSave(formattedTransaction);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };

  return (
    <div>
      <div id="modal1" className="modal" style={styles.modalWindow}>
        <div className="modal-content">
          <div style={styles.flexRowTitle}>
            <span style={styles.title}>Adição de Transação</span>
            <button className="modal-close waves-effect waves-lights btn red dark-4">
              X
            </button>
          </div>
          <div style={styles.flexColumn}>
            <div style={styles.flexRowRadio}>
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
            <div style={styles.flexRowInputDate}>
              <div className="input-field">
                <input
                  name="value"
                  type="number"
                  value={transaction.value}
                  onChange={handleOnChange}
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
          <div style={styles.flexButton}>
            <button
              disabled={disabledSaveButton}
              onClick={handleOnSaveButtonClick}
              className="modal-close waves-effect waves-green btn"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    padding: '10px',
    border: '1px solid #bdbdbd',
    borderRadius: '2px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  flexButton: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '10px',
  },

  modalWindow: {
    // display: 'none',
    // position: 'fixed',
    // left: 0,
    // right: 0,
    // backgroundColor: 'grey',
    // padding: 0,
    // maxHeight: '70%',
    // width: '55%',
    width: '35%',
    // width: 'auto',
    // margin: 'auto',
    // overflowY: 'auto',
    // overflowY: 'hidden',
    // borderRadius: '2px',
    // will-change: top, opacity,
    // zIndex: 1003,
    // opacity: 0,
    // transform: scaleX(0.7),
    // top: '4%',
    // boxSizing: 'border-box',
    // width: '75% !important',
    // maxHeight: '100% !important',
    maxHeight: '100%',
    // height: '1500px',
  },
};

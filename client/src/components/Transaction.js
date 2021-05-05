import React from 'react';
import * as stringHelpers from '../helpers/stringHelpers.js';

export default function Transaction({ children: transaction }) {
  const { day, category, description, value } = transaction;
  const {
    transactionStyle,
    dayStyle,
    categoryStyle,
    descriptionStyle,
    textAlignStyle,
    valueStyle,
    iconStyle,
  } = styles;

  return (
    <div style={transactionStyle}>
      <span style={dayStyle}>{stringHelpers.formatDayMonth(day)}</span>
      <div style={textAlignStyle}>
        <span style={categoryStyle}>{category}</span>
        <span style={descriptionStyle}>{description}</span>
      </div>
      <span style={valueStyle}>
        {stringHelpers.formatNumberCurrency(value)}
      </span>
      <span className="material-icons" style={iconStyle}>
        edit
      </span>
      <span className="material-icons" style={iconStyle}>
        delete
      </span>
    </div>
  );
}

const styles = {
  transactionStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    margin: '5px',
    padding: '5px',
    border: '1px solid grey',
    borderRadius: '5px',
  },

  dayStyle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginRight: '20px',
  },

  categoryStyle: {
    // fontSize: '1.2rem',
    fontWeight: 'bold',
    // marginRight: '20px',
  },

  descriptionStyle: {
    // fontSize: '1.2rem',
  },

  textAlignStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },

  valueStyle: {
    fontSize: '1.2rem',
    marginRight: '100px',
  },

  iconStyle: {
    marginRight: '10px',
    fontSize: '1.3rem',
  },
};

import React from 'react';
import * as stringHelpers from '../helpers/stringHelpers.js';
import Action from './Action.js';

export default function Transaction({ onActionClick, children: transaction }) {
  const { day, category, description, value } = transaction;
  const {
    transactionStyle,
    dayStyle,
    categoryStyle,
    descriptionStyle,
    textAlignStyle,
    valueStyle,
  } = styles;

  const backgroundColor = transaction.type === '+' ? '#64ffda' : '#ef9a9a';

  const handleActionClick = (id, type) => {
    onActionClick(id, type);
  };

  return (
    // <div style={Object.assign({}, transactionStyle, { backgroundColor })}>
    <div style={{ ...transactionStyle, backgroundColor }}>
      <span style={dayStyle}>{stringHelpers.formatDayMonth(day)}</span>
      <div style={textAlignStyle}>
        <span style={categoryStyle}>{category}</span>
        <span style={descriptionStyle}>{description}</span>
      </div>
      <span style={valueStyle}>
        {stringHelpers.formatNumberCurrency(value)}
      </span>
      <Action
        onActionClick={handleActionClick}
        id={transaction._id}
        type="edit"
      />
      <Action
        onActionClick={handleActionClick}
        id={transaction._id}
        type="delete"
      />
    </div>
  );
}

const styles = {
  transactionStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '5px',
    padding: '5px',
    // border: '1px solid grey',
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
};

import React from 'react';

export default function Action({ id, type, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(id, type);
  };

  return (
    <span
      className="material-icons"
      onClick={handleIconClick}
      style={styles.iconStyle}
    >
      {type}
    </span>
  );
}

const styles = {
  iconStyle: {
    marginRight: '10px',
    fontSize: '1.3rem',
    cursor: 'pointer',
  },
};

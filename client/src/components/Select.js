import React, { useEffect } from 'react';
import M from 'materialize-css';

export default function Select({ options, selectedValue, onSelect }) {
  const { containerStyle, buttonStyle, selectStyle } = styles;

  useEffect(() => {
    M.AutoInit();
  }, []);

  const handleSelectChange = ({ currentTarget }) => {
    onSelect(currentTarget.value);
  };

  return (
    <div style={containerStyle}>
      <div>
        <button
          style={buttonStyle}
          className="waves-effect waves-light btn-small"
        >
          {'<'}
        </button>
      </div>
      <div className="input-field" style={selectStyle}>
        <select value={selectedValue} onChange={handleSelectChange}>
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
          {/* <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option> */}
        </select>
      </div>
      <div>
        <button
          style={buttonStyle}
          className="waves-effect waves-light btn-small"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStyle: {
    marginLeft: '10px',
    marginRight: '10px',
  },

  selectStyle: {
    flex: '0 0 200px',
  },
};

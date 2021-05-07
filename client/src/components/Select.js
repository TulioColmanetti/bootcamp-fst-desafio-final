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
        <button style={buttonStyle} className="btn">
          {'<'}
        </button>
      </div>
      <div className="input-field" style={selectStyle}>
        <select
          className="browser-default"
          value={selectedValue}
          onChange={handleSelectChange}
        >
          {options.map((option) => {
            const { id, description, yearMonth } = option;
            return (
              <option key={id} value={yearMonth}>
                {description}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <button style={buttonStyle} className="btn">
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
    textAlignLast: 'center',
  },
};

import React from 'react';

export default function Main({ children }) {
  const { containerStyle } = styles;

  return (
    <main className="container">
      <div style={containerStyle}>
        <h5>Controle Financeiro Pessoal</h5>
        <div>{children}</div>
      </div>
    </main>
  );
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  },
};

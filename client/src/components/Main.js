import React from 'react';

export default function Main({ children }) {
  return (
    <main>
      <div className="center">
        <h5>Controle Financeiro Pessoal</h5>
        <div>{children}</div>
      </div>
    </main>
  );
}

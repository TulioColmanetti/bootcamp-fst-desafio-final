import React from 'react';

export default function Header({ children }) {
  return (
    <header>
      <h4 className="center">
        <strong> {children}</strong>
      </h4>
    </header>
  );
}

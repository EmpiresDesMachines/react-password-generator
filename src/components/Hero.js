import React from 'react';

function Hero({ copy, password }) {
  return (
    <div className="hero-container">
      Your generated password:{' '}
      <span className="hero" onClick={copy}>
        {password}
      </span>
    </div>
  );
}

export { Hero };

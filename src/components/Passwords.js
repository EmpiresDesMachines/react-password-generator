import React from 'react';

function Passwords({ copy, passwords }) {
  return (
    <ul className="passwords">
      <strong>
        Additional passwords (<i>click to copy</i>):
      </strong>{' '}
      <div onClick={copy}>{passwords}</div>
    </ul>
  );
}

export { Passwords };

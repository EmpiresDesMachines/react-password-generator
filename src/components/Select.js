import React from 'react';

function Select({ val, name, change }) {
  return (
    <div>
      <label>
        password length:{' '}
        <select value={val} type="text" name={name} onChange={change}>
          {Array(17)
            .fill()
            .map((_, idx) => (
              <option value={idx + 8} key={idx}>
                {idx + 8}
              </option>
            ))}
        </select>{' '}
        (min: 8, max: 24)
      </label>
    </div>
  );
}

export { Select };

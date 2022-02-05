import React from 'react';

function CheckBox({ name, checked, change, descr, disabled = false }) {
  return (
    <div>
      <label>
        {descr}
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={change}
          disabled={disabled}
        />
      </label>
    </div>
  );
}

export { CheckBox };

import React from 'react';
import { CheckBox } from './components/CheckBox';
import { Hero } from './components/Hero';
import { Passwords } from './components/Passwords';
import { Select } from './components/Select';
import { generatePassword } from './passwordMaker';

function App() {
  const [options, setPasswordOptions] = React.useState({
    len: 8,
    upper: false,
    num: false,
    symbols: false,
  });
  const [heroPassword, setHeroPassword] = React.useState(null);
  const [copy, setCopy] = React.useState(false);
  const [additionalPasswords, setAdditionalPasswords] = React.useState([]);
  const intervalRef = React.useRef();
  const heroRef = React.useRef();

  React.useEffect(() => {
    const initialOptions = localStorage.getItem('options');
    if (initialOptions) {
      setPasswordOptions(JSON.parse(initialOptions));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('options', JSON.stringify(options));
  }, [options]);

  const setPasswordLength = (e) => {
    setPasswordOptions((prevOptions) => ({ ...prevOptions, [e.target.name]: e.target.value }));
  };

  const toggleCheckboxValue = (e) => {
    setPasswordOptions((prevOptions) => ({
      ...prevOptions,
      [e.target.name]: !prevOptions[e.target.name],
    }));
  };

  const selectAll = () =>
    setPasswordOptions((prevOptions) => ({
      ...prevOptions,
      upper: true,
      num: true,
      symbols: true,
    }));

  const generate = () => {
    setHeroPassword(generatePassword(options.len, options.upper, options.num, options.symbols));
    setAdditionalPasswords(
      Array(20)
        .fill()
        .map((_, idx) => (
          <li key={idx}>
            {generatePassword(options.len, options.upper, options.num, options.symbols)}
          </li>
        )),
    );
  };

  const copyHeroPassword = (e) => {
    if (heroPassword) {
      const hero = document.querySelector('.hero');

      clearInterval(heroRef.current);
      hero.style.color = 'green';
      navigator.clipboard.writeText(heroPassword);
      setCopy(true);
      heroRef.current = setInterval(() => {
        hero.style.color = '';
        setCopy(false);
      }, 2000);
    }
  };

  const copyAdditional = (e) => {
    if (e.target.tagName === 'LI') {
      clearInterval(intervalRef.current);
      [...document.querySelectorAll('li')].map((node) => (node.style = ''));
      navigator.clipboard.writeText(e.target.innerText);
      e.target.style.color = 'green';
      intervalRef.current = setInterval(() => {
        e.target.style.color = '';
      }, 2000);
    }
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="options">
        <Select val={options.len} name="len" change={setPasswordLength} />
        <CheckBox
          name="num"
          checked={true}
          change={null}
          descr="Lowercase letters"
          disabled={true}
        />
        <CheckBox
          name="upper"
          checked={options.upper}
          change={toggleCheckboxValue}
          descr="Uppercase letters"
        />
        <CheckBox name="num" checked={options.num} change={toggleCheckboxValue} descr="Numbers" />
        <CheckBox
          name="symbols"
          checked={options.symbols}
          change={toggleCheckboxValue}
          descr="Symbols"
        />
        <button onClick={selectAll}>Select All</button>
      </div>

      <div className="generate">
        <button onClick={generate}>Generate Password</button>
        <div className="copy">
          <button onClick={copyHeroPassword}>Copy Password</button>{' '}
          {copy ? 'copied!' : 'click to copy!'}
        </div>
      </div>

      <Hero copy={copyHeroPassword} password={heroPassword} />
      <Passwords copy={copyAdditional} passwords={additionalPasswords} />
    </div>
  );
}

export default App;

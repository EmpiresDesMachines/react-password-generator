const generatePassword = (len, upper, num, symb) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const upperLetters = letters.toUpperCase();
  const numbers = '0123456789';
  const symbols = '!@#$%&*+?()_';
  let result = '';

  let asset = letters;

  const getRandomFrom = (str) => str[Math.floor(Math.random() * str.length)];

  const shuffle = (str) => [...str].sort(() => Math.random() - 0.5).join('');

  result += getRandomFrom(letters);
  result += getRandomFrom(letters);

  if (upper) {
    asset += upperLetters;
    result += getRandomFrom(upperLetters);
    result += getRandomFrom(upperLetters);
  }

  if (num) {
    asset += numbers;
    result += getRandomFrom(numbers);
    result += getRandomFrom(numbers);
  }

  if (symb) {
    asset += symbols;
    result += getRandomFrom(symbols);
    result += getRandomFrom(symbols);
  }

  for (let i = len - result.length; i > 0; i--) {
    result += getRandomFrom(asset);
  }

  return shuffle(result);
};

export { generatePassword };

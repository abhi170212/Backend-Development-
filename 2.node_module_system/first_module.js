function sum(num1, num2) {
  return num1 + num2;
}

function subtract(a, b) {
  return Math.abs(a - b);
}

function divide(a, b) {
  if (b == 0) {
    throw new Error("Can not divide by zero");
  }
  return a / b;
}

module.exports = {
  sum,
  subtract,
  divide,
};

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

console.log("promise Lecture Starts");
delay(2000).then(() => {
  console.log("After 2 seconds Promise Resolved");
});
console.log("End");

function myDivide(num1, num2) {
  return new Promise((res, rej) => {
    if (num2 === 0) {
      rej("Can not divide it br,sorry");
    } else {
      res(num1 / num2);
    }
  });
}

myDivide(10, 5)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

  myDivide(10, 5)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

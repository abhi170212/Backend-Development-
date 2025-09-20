const md = require("./first_module");

const ans = md.sum(3, 6);
console.log(ans);

try {
  console.log("trying to divide by zero");
  let result = md.divide(3, 0);
  console.log(result);
} catch (err) {
  console.log("caught an error", err.message);
}

//module wrapper 
/*
( function ( exports,require,module,__filename,__dirname){
     // your module code 
}

)
*/
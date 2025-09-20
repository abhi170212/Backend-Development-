function Person(name,callback){
     console.log(`Hello, ${name}`);
     callback(); 
}

function address(){
     console.log("India")
}
Person("Abhishek Kumar Singh",address)
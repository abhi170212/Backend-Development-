const EventEmitter = require('events');
const myFirstEmitter = new EventEmitter();

// register an event 
myFirstEmitter.on('greet',name => {
     console.log(`Hello ${name}`);
})
myFirstEmitter.emit('greet','Abhishek Singh');



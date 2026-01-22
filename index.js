const EventEmitter = require('node:events');
const emitter = new EventEmitter();

emitter.on('orderPizza', (boyut, icindekiler) => {
  console.log(`Bir ${boyut} pizza pişiriliyor. İçindekiler: ${icindekiler}`);
});

emitter.emit("orderPizza", "small", "peynir");

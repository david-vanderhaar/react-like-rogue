var names = require('fantasy-names');

collection = [];

for (let i = 0; i < 10; i++) {
  collection.push(names('descriptions', 'dungeons', 1))
}

console.log(collection)

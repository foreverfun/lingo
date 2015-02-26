var _ = require('underscore');

var words = [
  'hello',
  'august',
  'april',
  'arms',
  'atom',
  'boy',
  'berry',
  'bar',
  'ball',
  'boss',
  'care',
  'carry',
  'car',
  'catch',
  'careful',
  'dog',
  'dessert',
  'dress',
  'destination',
  'dear'
];

var randomPickedWords = function(numOfWords) {
  return _.sample(words, numOfWords);
}



module.exports = {
  randomPickedWords:randomPickedWords
}
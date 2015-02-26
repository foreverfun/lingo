var scores = function(words, language) {
  this.words = words;
  this.language = language;
};

var pickedWords = [];
var chosenLanguage;
var currentQuestion=0;

module.exports = {
  pickedWords:pickedWords,
  chosenLanguage:chosenLanguage,
  currentQuestion:currentQuestion
}
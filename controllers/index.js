
// var BeGlobal = require('node-beglobal');
// var beglobal = new BeGlobal.BeglobalAPI({
//   api_token: 'wsV%2B3A47wGAxxJ9hYYdvuQ%3D%3D'
// });
var translation = require('../models/translation.js');
var words = require('../models/words.js');
var scores = require('../models/scores.js')

var indexController = {
	index: function(req,  res) {
		res.render('index');
	},

  translate:function(req, res) {
    res.render('translate');
  },

  translateAction: function(req, res) {
    
    beglobal.translations.translate(
      //{text: 'hello', from: 'eng', to: 'fra'},
      {text: req.body.word, from: req.body.from, to: req.body.to},
      function(err, results) {
        if (err) {
          console.log(err);
          return res.render('tranlsate', {result:"sorry, no translation is found!"})
        }
        console.log(results.translation);
        res.render('translate', {result:results.translation});
      });
  },

  quiz: function(req, res) {
    //console.log(req.params.p);
    if (scores.currentQuestion === 0) {
      res.render('quiz');
    }
    else {
      console.log("quiz else");
      scores.currentQuestion++;
      res.render('quiz', {
        index:scores.currentQuestion, 
        word:scores.pickedWords[scores.currentQuestion]
      });
    }
  },

  langAction: function(req, res) {
    console.log(req.body.lang);
    scores.chosenLanguage = req.body.lang;
    scores.currentQuestion = 0;
    scores.pickedWords = words.randomPickedWords(10);
    console.log(scores.pickedWords);
    res.render('quiz', {
      index:scores.currentQuestion,
      word:scores.pickedWords[scores.currentQuestion]
    });
  },

  quizAction: function(req, res) {
      console.log("form", req.body.translation);
      beglobal.translations.translate(
      //{text: 'hello', from: 'eng', to: 'fra'},
      {text: scores.pickedWords[scores.currentQuestion], from: 'eng', to: scores.chosenLanguage},
      function(err, results) {
        if (err) {
          console.log("err:", err);
          return err;
        }
        console.log("translation:",results);
        if (results.translation === req.body.translation) 
          res.render('quiz', {
            correct:"correct"
          });
      });
      //res.render('');
  }

  
  
};

module.exports = indexController;
var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({api_token: 'wsV%2B3A47wGAxxJ9hYYdvuQ%3D%3D'});

var words = require('../models/words.js');
var scores = require('../models/scores.js')


var quizController = {
  quiz: function(req, res) {
    //console.log(req.params.p);
    if (scores.currentQuestion === 0) {
      res.render('quiz');
    }
    else {
      if (scores.currentQuestion < 11) {
        console.log("quiz else");
        scores.currentQuestion++;
        res.render('quiz', {
          index:scores.currentQuestion, 
          word:scores.pickedWords[scores.currentQuestion]
        });
      } else {
        res.redirect('/progress');
      }
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
      //console.log("form", req.body.translation);
      beglobal.translations.translate({
        text: scores.pickedWords[scores.currentQuestion], 
        from: 'eng', 
        to: scores.chosenLanguage
        },
        function(err, results) {
          if (err) {
            //console.log(err);
            return err;
          }
          //console.log("quiz:",results.translation);
          var resultStr;
          if (results.translation === req.body.translation) {
            resultStr ="correct";
          } else {
            resultStr = "incorrect";
          }
          scores.currentQuestion++;
          res.render(
            'quiz', 
            { index:scores.currentQuestion,
              word:scores.pickedWords[scores.currentQuestion],
              result: resultStr,
              resultEntry: req.body.translation,
              resultTranslation: results.translation}
          );
      });
  }

}

module.exports = quizController;
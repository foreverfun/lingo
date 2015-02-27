var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({api_token: 'wsV%2B3A47wGAxxJ9hYYdvuQ%3D%3D'});

var translationController = {
  translate: function(req,  res) {
    res.render('translate');
  },

  translateAction: function(req, res) {
    beglobal.translations.translate(
      {text: req.body.word, from: req.body.from, to: req.body.to},
      function(err, results) {
        if (err) {
          //console.log(err);
          return err;
        }
        //console.log(results.translation);
        if (req.body.word != results.translation) {
          res.render('translate', {result:results.translation});
        } else {
          res.render('translate', {result:"Translation couldn't be found!"});
        }
      });
  }
}

module.exports = translationController;

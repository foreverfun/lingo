
var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'wsV%2B3A47wGAxxJ9hYYdvuQ%3D%3D'
});

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
          return console.log(err);
        }
        console.log(results.translation);
        res.render('translate', {result:results.translation});
      });
      // res.redirect('/translate');
  }
  
};

module.exports = indexController;
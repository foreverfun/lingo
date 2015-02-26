var express = require('express');

var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);
app.get('/translate', indexController.translate);
app.post('/translateForm', indexController.translateAction);

app.get('/quiz', indexController.quiz);
app.post('/langForm', indexController.langAction);
app.post('/quizForm', indexController.quizAction);

var server = app.listen(6594, function() {
	console.log('Express server listening on port ' + server.address().port);
});

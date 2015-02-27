var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var translationController = require('./controllers/translation.js')
var quizController = require('./controllers/quiz.js')
var progressController = require('./controllers/progress.js')

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

app.get('/translate', translationController.translate);
app.post('/translateForm', translationController.translateAction);

app.get('/quiz', quizController.quiz);
app.post('/langForm', quizController.langAction);
app.post('/quizForm', quizController.quizAction);

app.get('/progress', progressController.progress);

var server = app.listen(6594, function() {
	console.log('Express server listening on port ' + server.address().port);
});

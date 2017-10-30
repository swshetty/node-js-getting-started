var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  //response.render('pages/index');
  //response.status(200).send('just some test response');
  if (request.query['hub.verify_token'] === 'test_token') {
    response.send(request.query['hub.challenge'])
  }
  response.send('Error, wrong token')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

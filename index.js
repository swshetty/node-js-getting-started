var express = require('express');
var app = express();

const verifyToken = process.env.VERIFY_TOKEN;


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Index route
app.get('/', function (req, res) {
  res.send('Hello world, I am a chat bot')
})

app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === verifyToken) {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

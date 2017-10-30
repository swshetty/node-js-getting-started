var express = require('express');
var app = express();
var request = require('request')

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
  // if (req.query['hub.verify_token'] === verifyToken) {
  //   res.send(req.query['hub.challenge'])
  // }
  // res.send('Error, wrong token')


  var messaging_events = req.body.entry[0].messaging
    for (var i = 0; i < messaging_events.length; i++) {
      var event = req.body.entry[0].messaging[i]
      var sender = event.sender.id
      if (event.message && event.message.text) {
        var text = event.message.text;
        console.log("------received:"+text+"--------------");
        sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
      }
    }
    res.sendStatus(200);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function sendTextMessage(sender, text) {
    var messageData = { text:text };
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:verifyToken},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
    if (error) {
        console.log('Error sending messages: ', error)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
}

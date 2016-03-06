var express = require('express');

var app = express();

var port = 5000;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/src/views/index.html');
});

app.listen(port, function () {});

var pop;
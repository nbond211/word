var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var port = 5000;

app.use(express.static('public'));
app.use(express.static('src/views'));

var settings = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

var apiKey = settings.WordnikAPI.apiKey;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/src/views/index.html');
});

app.post('/search', function (req, res) {

    var searchWord = req.body.text;

    request('http://api.wordnik.com:80/v4/word.json/' + searchWord + '/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=500&api_key=' + apiKey, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    });

});

app.listen(port, function () {});
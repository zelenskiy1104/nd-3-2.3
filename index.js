const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.get('/', function(req, res) {
    res.status(200).send('Hello Express.js');
});

app.get('/hello', function(req, res) {
    res.status(200).send('Hello stranger !');
});

app.get('/hello/:name', function(req, res) {
    let name = req.params.name || false;

    res.status(200).send('Hello, '+name+'!');
});

app.all('/sub/*/*', function(req, res) {
    let params = Object.keys(req.params).map(key => req.params[key]);
    let answer = 'You requested URI: /sub/'+params.join('/');
    res.status(200).send(answer);
});

app.post('/post', function (req, res, next) {
    let key = req.get('Key') || false;
    if (!key) {
        res.status(401).send('Unauthorized');
    }
    else {
        next();
    }
}, function (req, res) {
    if (Object.keys(req.body).length == 0) {
        res.status(404).send('Not Found');
    }
    else {
        res.json(req.body);
    }
});
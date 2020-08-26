/* const http = require('http');

const server = http.createServer((req, res) => {
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(3000, () => {
    console.log('Serve on port 3000');
}); */

const express = require('express');
const morgan = require('morgan');
const app = express();

/* function logger(req, res, next){
    console.log(`Route Received: ${req.protocol}://${req.get('host')}${
        req.originalUrl
    }`);
    next();
} */

//Settings
app.set('appName', 'Wendo Express Tutorial');
app.set('port', 3000);
app.set('view engine','ejs');

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

//Routes
/* app.all('/user', (req, res, next) => {
    console.log('Por aquí paso');
    next();
}); */

app.get('/', (req, res) => {
    const data = [{name: 'Jhon'}, {name: 'Joe'}, {name: 'cameron'}, {name: 'ryan'}];
    res.render('index.ejs', {people: data});
})

app.get('/user', (req, res) =>{
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    });
});

app.post('/user/:id', (req, res) =>{
    console.log(req.body);
    console.log(req.params);
    res.send('POST REQUEST RECEIVED');
});

app.put('/user/:id', (req, res) =>{
    console.log(req.body);
    res.send(`User ${req.params.id} updated`);
});

app.delete('/user/:userID', (req, res) =>{
    res.send(`User ${req.params.userID} deleted`);
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Serve on port', app.get('port'));
});
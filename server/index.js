const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
// const http = require('http');

// mongo connected
mongoose.Promise = global.Promise;
// Connect to mongoose

mongoose.connect('mongodb://localhost:27017/auth', {
    useNewUrlParser: true
}).then(() => {
    console.log('Mongodb connected');
}).catch((err) => {
    console.log(err);
});

const app = express();

// app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json({type: '*/*'}));


routes(app);


const PORT = process.env.PORT || 3001

// const server = http.createServer(app);

// server.listen(PORT)

app.listen(PORT, () => {
    console.log(`Server connected on ${PORT}`);
})
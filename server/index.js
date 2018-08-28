const express = require('express');
const {json} = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const {read} = require('./controllers/swag_controller');
const {login, register, signout, getUser} = require('./controllers/auth_controller');

const app = express();

app.use(json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(checkForSession);

app.get('/api/swag', read);
app.get('/api/user', getUser);
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, ()=> {console.log(`Sever listening on port: ${port} ;D`)});
const express = require('express');
const {json} = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const {read} = require('./controllers/swag_controller');
const {login, register, signout, getUser} = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./search_controller');

const app = express();

app.use(json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

app.get('/api/swag', read);
app.get('/api/user', getUser);
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);
app.get('/api/search', search_controller.search);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, ()=> {console.log(`Sever listening on port: ${port} ;D`)});
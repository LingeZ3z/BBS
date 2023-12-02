const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser())
app.use(cookieParser());
app.use(session({
    secret: 'Just_Love_Railgun',
    resave: false,
    saveUninitialized: false
}));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log("Server Started.")
})
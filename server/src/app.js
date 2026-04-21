const express = require('express');
const cookieparser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieparser());

const authRouter = require('./routes/auth.routes');

app.use('/api/auth',authRouter);

module.exports = app;
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

const authRouter = require('./routes/auth.routes');
const resumeRouter = require('./routes/resume.routes');

app.use('/api/auth', authRouter);
app.use('/api/resume', resumeRouter);

module.exports = app;
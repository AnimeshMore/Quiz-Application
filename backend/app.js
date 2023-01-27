const express = require('express');
const app=express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/error')

app.use(express.json());
app.use(cookieParser());

const quizzes = require('./routes/quiz');
const auth = require('./routes/auth');
const question=require('./routes/questions');
const userquiz = require('./routes/userquiz');


app.use('/api/v1/',quizzes);
app.use('/api/v1/',auth);
app.use('/api/v1/',question);
app.use('/api/v1/',userquiz);


// Middleware to handle error
app.use(errorMiddleware);

module.exports=app;
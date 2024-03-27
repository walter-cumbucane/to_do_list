const express = require('express');
const bodyParser = require('body-parser');
const log = require('morgan');
const usersRouter = require('./api/routes/users');
const tasksRouter = require('./api/routes/tasks');
const app = express();


//Sets a middleware for the logging
app.use(log('dev'));


//Handles Json's requests parsing
app.use(bodyParser.json());


//Handles CORS
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',  'Origin, X-Requested-With, Content-Type, Authorization');
    
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, POST, PUT');
        res.status(200).json({});
    } 
    next();
});



//Handles routing
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);


/* 
 * Error Handling
*/

//If a request with an unknown route appears
app.use((req, res, next) => {

    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Every error in the application will be redirected to this middleware
app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});



//Server Listening Setup
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
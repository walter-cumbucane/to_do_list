const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./api/routes/users');
const tasksRouter = require('./api/routes/tasks');
const app = express();


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



//Server Listening Setup
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
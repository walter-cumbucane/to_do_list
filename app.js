const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./api/routes/users');
const tasksRouter = require('./api/routes/tasks');

const app = express();

app.use(bodyParser.json());
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
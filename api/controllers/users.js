const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
const hash = require('../utilities/hash');


exports.get_all = async (req, res, next) => {

    res.status(200).json({
        message: 'GET ROUTE working'
    });
}


exports.create_user = async (req, res, next) => {

    const userId = uuidv4();
    const username = req.body.username;
    const email = req.body.email;

    hash(userId, username, email, req.body.password)
    .then((newUser) => {
            console.log('User created');
            console.log(newUser);
            res.status(201).json({
                message: 'User successfully created'
            });
    }).
    catch ((err) => {
        res.status(500).json({
            error: err
        });
    });
}
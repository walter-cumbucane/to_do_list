const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
const hash = require('../utilities/hash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.get_all = async (req, res, next) => {

    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            data: users,
            message: 'To get more information: http://localhost:5000/api/v1/users/:id'
        })
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}


exports.get_one = async (req, res, next) => {

    const userId = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        return res.status(200).json({
            data: user,
            message: 'Get a list of all users at: http://localhost:5000/api/v1/users'
        });
    }
    catch (err) {
        res.status(500).json({
            error: err
        });
    }
}


exports.create_user = (req, res, next) => {

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

exports.deleteUser = async (req, res, next) => {

    const id = req.params.id;
    try {
        const deletedUser = await prisma.user.delete({

            where: {id: id}
        });
        console.log(deletedUser);
        res.status(200).json({
            message: 'User successfully deleted',
            more: 'Add a new user at POST http://localhost:5000/api/v1/users/signup'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}


exports.login = async (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await prisma.user.findUnique({
        where: {username: username}
    });
    if (!user){
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
    bcrypt.compare(password, user.password, (err, result) => {

        if (err) {
            return res.status(401).json({
                message: 'Auth Failed'
            });
        }

        //Returns true if the hashes are equal
        if (result) {
            const token = jwt.sign({
                username: username,
                id: user.id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            
            return res.status(200).json(token);
        }
        res.status(401).json({
            message: 'Auth failed'
        });
    });
}
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');


exports.get_all = async (req, res, next) => {

    try {
        const tasks = await prisma.task.findMany();
        res.status(200).json({
            data: tasks,
            message: 'More Information at: http://localhost:5000/api/v1/tasks/:id'
        });

    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}


exports.get_one = async (req, res, next) => {

    const taskId = req.params.id;
    console.log(taskId);

    try {
        const user = await prisma.task.findUnique({
            where: {id: taskId}
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({
            data: user,
            message: 'Information about all users at: http://localhost:5000/api/v1/tasks/'
        });

    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}


exports.create_task = async (req, res, next) => {
    
    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;
    const id = uuidv4();


    const user = await prisma.user.findUnique({
        where: { id: userId}
    });
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    try {
        const newTask = await prisma.task.create({
            data: {
                id,
                title,
                description,
                completed,
                userId
            }
        });
        res.status(201).json({
            message: 'Task successfully created'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }


}


exports.delete_task = async (req, res, next) => {

    const taskId = req.params.id;

    try {
        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId
            }
        });
        res.status(200).json({
            message: 'Task successfully deleted'
        });

    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
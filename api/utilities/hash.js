const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (userId, username, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                id: userId,
                password: hashedPassword,
                email,
                username
            }
        });
    }
    catch (err) {
        return err;
    }
}
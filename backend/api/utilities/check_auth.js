const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    try {

        const userDatExtractedFromTheToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = userDatExtractedFromTheToken;
        next();
    
    } catch (err) {

        res.status(401).json({
            message: 'Auth Failed'
        });
    }
}
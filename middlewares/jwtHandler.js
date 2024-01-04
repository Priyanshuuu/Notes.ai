const jwt = require('jsonwebtoken');

async function getJwtToken(req) {
    try {
        const {user} = req; 
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2m' }
        );

        if (!token) {
            const error = new Error();
            error.message = 'JWT token generation failed';
            error.code = 401;
            throw error;
        }

        return token;
    } catch (error) {
        throw error;
    }
}

async function authenticateJWT(req) {
    try {
        const token = req.header('x-authenticated-token');
        if (!token) {
            const error = new Error();
            error.message = 'Authentication failed';
            error.code = 401;
            throw error;
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                const error = new Error();
                error.message = 'Token is not valid';
                error.code = 403;
                throw error;
            }
            return user;
        });

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getJwtToken,
    authenticateJWT
}
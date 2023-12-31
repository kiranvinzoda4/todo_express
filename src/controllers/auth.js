const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const saltRounds = process.env.PW_SALT;
const secretKey = process.env.JWT_KEY;

const getToken = (userPayload) => {
    const token_data = jwt.sign(userPayload, secretKey, { expiresIn: '1h' });
    return token_data;
};

const generatePassword = async (plainPassword) => {
    const encryptedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return encryptedPassword;
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        res.status(401).send({ error: true, message: "Token not found" }) // if there isn't any token
        return res.end()
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: true, message: "Authorization failed!" })
            return res.end();
        }
        req.user = decoded;
        next();
    });
}

const comparePasswords = async (
    enteredPassword,
    encryptedPassword
) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(enteredPassword, encryptedPassword, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { getToken, verifyToken, generatePassword, comparePasswords };


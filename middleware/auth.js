const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: "No authentication token, authorization denied." });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET || "a_secret_key");
        if (!verified) {
            return res.status(401).json({ msg: "Token verification failed, authorization denied." });
        }

        req.user = verified.id;
        next(); // Move on to the next piece of middleware or the route itself

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = auth;

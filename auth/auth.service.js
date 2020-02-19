const authenticate = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(403).send('Not authenticated')
    }
};


module.exports = {
    authenticate
};
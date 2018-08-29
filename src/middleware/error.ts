export const errorHandling = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({
            error: 'Unauthorized user.'
        });
    }

    if (err.name === 'SyntaxError') {
        return res.status(400).send({
            error: 'Syntax error.'
        });
    }

    if (err) {
        return res.status(400).send({
            error: 'Error.'
        });
    }

    return next(err, req, res);
};

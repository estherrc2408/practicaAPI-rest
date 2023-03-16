const { validationResult } = require('express-validator');

const validateServices = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next()
    } else {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
};
module.exports = {
    validateServices
};
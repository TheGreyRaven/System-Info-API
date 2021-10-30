const errorHandling = (err, req, res, next) => {
    switch (true) {
        case (typeof err === 'string'):
            return res.status(400).json({
                message: err
            })

        case (err.name === 'ValidationError'):
            return res.status(400).json({
                message: err.message
            })

        case (err.name === 'UnauthorizedError'):
            return res.status(401).json({
                message: 'Invalid Token'
            })

        default:
            return res.status(500).json({
                message: err.message
            })
    }
}

module.exports = errorHandling;
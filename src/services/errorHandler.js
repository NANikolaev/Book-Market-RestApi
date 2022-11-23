function errorHandler(err, req, res, next) {
    if (err.message) {
        if (err.code == 11000) {
            key = Object.keys(err.keyPattern)[0]
            return res.status(400).json({ errors: [`${key} is already taken`] })

        }
    }

    if (!err.errors) {
        return res.status(400).json({ errors: [err.message] })

    }
    else if (err.errors) {
        let errors = Array.from(Object.keys(err.errors)).map(k => err.errors[k].message);
        return res.status(400).json({ errors: errors })
    }


}

module.exports = (server) => {
    server.use(errorHandler)
}
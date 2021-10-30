const expressJwt = require('express-jwt');

const jwt = () => {
    return expressJwt({ secret: 'SomeSecretThatIsNotReal', algorithms: ['HS256'], isRevoked }).unless({
        path: [
            '/users/login',
            '/users/register'
        ]
    });
}

const isRevoked = async (req, payload, done) => {
    const user = true // this is just for now until there is an actual database

    if (!user) {
        return done(null, true);
    }

    done();
};

module.exports = jwt;
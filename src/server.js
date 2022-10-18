const express = require('express')
const bodyParser = require('body-parser');
const { registerRoutes } = require('./router');

const spawnServer = () => {
    const app = express()
    const port = 8080

    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
    });

    registerRoutes(app);

    app.listen(port, () => {
        console.log(`RESTful server running at http://127.0.0.1:${port}`)
    })
}

module.exports = { spawnServer };
const express = require('express')
const bodyParser = require('body-parser');
const { registerRoutes } = require('./router');

const spawnServer = () => {
    const app = express()
    const port = 8080

    app.use(bodyParser.json());

    registerRoutes(app);

    app.listen(port, () => {
        console.log(`RESTful server running at http://127.0.0.1:${port}`)
    })
}

module.exports = { spawnServer };
const router = require('express').Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const databaseController = require('./databaseController.js')
const config = require('../config/config.js')

router.use(bodyParser.json())

router.get("/", async (req, res) => {
    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);

        let client = databaseController.getClient()

        databaseController.getAllUsers(client, result => {
            res.send(result)
        })
    } catch (err) {
        res.sendStatus(403)
    }

});

module.exports = router
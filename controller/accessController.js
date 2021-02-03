const router = require('express').Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const databaseController = require('./databaseController.js');
const config = require('../config/config.js')

router.use(bodyParser.json())

router.post("/", (req, res) => {
    console.log("Recibio solicitud de acceso")
    const {
        username,
        password
    } = req.body

    let client = databaseController.getClient()
    databaseController.getUser(client, username, password, result => {
        if (result) {
            let token = jwt.sign({
                userID: username
            }, config.security.key, {
                expiresIn: 1800
            })
            res.status(200).send({
                token: token
            })
        } else
            res.sendStatus(403)
    })
});

module.exports = router
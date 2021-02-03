const router = require('express').Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const databaseController = require('./databaseController.js')
const config = require('../config/config.js')

router.use(bodyParser.json())

router.get("/", async (req, res) => {
    console.log("Recibio solicitud de obtencion de datos")

    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);

        let client = databaseController.getClient()

        databaseController.getAllUsers(client, async result => {
            res.status(200).send(result)
        })
    } catch (err) {
        res.sendStatus(403)
    }

});

router.patch("/:id", async (req, res) => {
    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);

        let client = databaseController.getClient()

        databaseController.updateUser(client, req.params.id, req.body, result => {
            if (result > 0)
                res.status(200).send("User updated successfully")
            else
                res.status(404).send("User not found")
        })
    } catch (err) {
        res.sendStatus(403)
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);

        let client = databaseController.getClient()

        databaseController.deleteUser(client, req.params.id, result => {
            if (result > 0)
                res.status(200).send("User deleted successfully")
            else
                res.status(404).send("User not found")
        })
    } catch (err) {
        res.sendStatus(403)
    }
});

module.exports = router
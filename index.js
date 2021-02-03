const express = require('express');
const accessController = require('./controller/accessController.js');
const usersController = require('./controller/usersController.js');

const app = express();
const port = 4200;



app.use("/login", accessController)
app.use("/users", usersController)


app.listen(port, () => {
    console.log("Servidor esperando en el puerto " + port)
})


module.exports = app
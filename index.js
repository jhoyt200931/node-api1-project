const express = require("express");
const shortid = require('shortid');

const server = express();
server.use(express.json);

let users = [];

server.post('/api/users', (req, res) => {
    let userInfo = req.body;

    function validateUser(user) {
        if(!user.name) {
            return false
        } else if (!user.bio) {
            return false
        } else {
            return true
        }
    }

    if(validateUser(userInfo)) {
        userInfo.id = shortid.generate();
        users.push(userInfo);

        res.status(201).json(userInfo)
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
});

server.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});
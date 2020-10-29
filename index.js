const express = require("express");
const shortid = require('shortid');

const server = express();
server.use(express.json());

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

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    let index = users.findIndex(user => user.id === id);
    // const found = users.find(user => user.id === id);

    

    if(index !== -1) {
        res.status(200).json(users[index])
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }


})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const found = users.find(user => user.id === id);

    if(found) {
        users = users.filter(user => user.id !== id);
        res.status(200).json({ Message: 'This user was deleted' })
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    let index = users.findIndex(user => user.id === id);

    function validateUser(user) {
        if(!user.name) {
            return false
        } else if (!user.bio) {
            return false
        } else {
            return true
        }
    }

    if(index !== -1) {
        if(validateUser(changes)){
            changes.id = id;
            users[index] = changes;
            res.status(200).json(users[index]);
        } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
})

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});
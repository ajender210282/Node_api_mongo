const express = require("express");
module.exports = (app) => {
    const users = require('../controllers/UsersController');

    // Create a new User
    app.post('/users', users.createUser);

    // Retrieve all Users
    app.get('/users', users.getAllUsers);

    // Retrieve a single User with userId
    app.get('/users/:userId', users.getUserById);

    // Update a User with userId
    app.put('/users/:userId', users.updateUser);

    // Delete a User with userId
    app.delete('/users/:userId', users.deleteUser);
}
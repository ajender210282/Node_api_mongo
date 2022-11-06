const Users = require('../models/users.js'); 
var validator = require("email-validator");
const users = require('../models/users.js');
var Password = require("node-php-password");
// Retrieve and return all users from the database.
exports.getAllUsers = async (req, res) => {

 
    Users.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
 
};
  


// Create and Save a new user
exports.createUser = (req, res) => {
    // Validate request
    if(!req.body.email || req.body.email == '' ) {
        return res.status(400).send({
            message: "users email can not be empty"
        });
    }

    

    if(!validator.validate(req.body.email)) {
        return res.status(400).send({
            message: "users email should be valid"
        });
    }
    if(!req.body.password || req.body.password == '' ) {
        return res.status(400).send({
            message: "users password can not be empty"
        });
    }
    if(req.body.password != req.body.confirmPassword) {
        return res.status(400).send({
            message: "users password and confirm password should be same"
        });
    }
    

    // Create a User
    const users = new Users({
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        password:Password.hash(req.body.password),
        createdAt:new Date()
    });

    // Save User in the database
    users.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

 
exports.getUserById = async (req, res) => {

    if(!req.params.userId) {
        return res.status(400).send({
            message: "user id can not be empty"
        });
    }

    Users.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};
 
exports.updateUser = async (req, res) => {


    // Validate Request
    if(!req.params.userId) {
        return res.status(400).send({
            message: "user id can not be empty"
        });
    }
    if(!req.body.firstName) {
        return res.status(400).send({
            message: "User first name can not be empty"
        });
    }
    if(!req.body.lastName) {
        return res.status(400).send({
            message: "users last name can not be empty"
        });
    }
    if(!req.body.phone) {
        return res.status(400).send({
            message: "users mobile number can not be empty"
        });
    }

    // Find user and update it with the request body
    Users.findByIdAndUpdate(req.params.userId, {
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        modefiedAt: new Date()
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};
 
// Delete a user with the specified userId in the request
exports.deleteUser = async (req, res) => {

    if(!req.params.userId) {
        return res.status(400).send({
            message: "user id can not be empty"
        });
    }

    Users.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
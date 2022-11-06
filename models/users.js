const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};
const usersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
  phone:String,
  password:String,
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modefiedAt:{
    type:Date,
    default:''
  }
});
 
module.exports = mongoose.model("Users", usersSchema);
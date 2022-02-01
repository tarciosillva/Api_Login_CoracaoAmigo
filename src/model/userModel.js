const mongoose = require("mongoose");
const mongoConnnet = require("../database/connection");
const { Schema } = mongoose;

const UserModel = new Schema({
  idReferenceRegister: String,
  email: {type: String, unique:true},
  googleUserId:String,
  facebookUser:String,
  password: String,
  typeUser: String,
});

const Users = mongoConnnet.model("Users", UserModel);

module.exports = { Users };

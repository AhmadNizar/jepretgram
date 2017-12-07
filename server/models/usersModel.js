const mongoose = require("mongoose")
const Schema   = mongoose.Schema

const usersSchema = mongoose.Schema({
	name: String,
	memberid: String,
	email: String,
	password: String,
	createdAt: Date,
	updatedAt: Date  
})

var User = mongoose.model("User", usersSchema)

module.exports = User

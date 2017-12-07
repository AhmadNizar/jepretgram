const mongoose = require("mongoose")

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

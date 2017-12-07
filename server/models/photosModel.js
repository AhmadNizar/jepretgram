const mongoose = require("mongoose")

const photosSchema = mongoose.Schema({
	title: String,
	imgurl: String,
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	voter_id: [{
		type: Schema.Types.ObjectId,
		ref: "User"
	}],
	createdAt: Date,
	updatedAt: Date  
})

var User = mongoose.model("User", photosSchema)

module.exports = User

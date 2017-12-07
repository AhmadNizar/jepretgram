const FB         = require('fb')
const fb         = new FB.Facebook({version: 'v2.8'})
const bcrypt     = require('bcrypt')
const saltRounds = 10
const jwt 			 = require('jsonwebtoken')
const User 			 = require("../models/usersModel")

class UserCtrl {

	static createUser (req, res) {
		bcrypt.hash(req.body.password, saltRounds).then(hash => {
			// Store hash in your password DB.
			User.create({
				name     : req.body.name,
				memberid : null,
				email    : req.body.email,
				password : hash, 
				createdAt: new Date(),
				updatedAt: new Date()
			})
				.then(newUserData => res.status(200).send(newUserData))
				.catch(err => res.status(500).send(err))
		})
	}

	static loginUser (req, res) {
		User.findOne({
			email: req.body.email
		})
			.then(userData => {
				if (userData === null) {
					res.status(403).send("invalid")
				} else {
					if (userData.password != req.body.password) {
						res.status(403).send("invalid")
					} else {
						var token = jwt.sign({ 
							_id: userData._id,
							isLogin: true 
						}, "shhhhh")

						res.status(200).send(token)
					}
				}
			})
			.catch(err => res.status(500).send(err))
	}

	static loginFB (req, res) {
		User.findOne({
			memberid: req.body.userID
		})
			.then(userData => {
				if (userData === null) {
					FB.setAccessToken(req.headers.accesstoken)
					FB.api(req.body.userID, { fields: ["id", "name", "email"] }, function (response) {
						if(!response || response.error) {
							console.log(!response ? "error occurred" : response.error)
							res.status(500).send(response.error)
						}

						User.create({
							name     : response.name,
							memberid : response.id,
							email    : response.email,
							password : null, 
							createdAt: new Date(),
							updatedAt: new Date()
						})
							.then(newUserData => {
								var token = jwt.sign({ 
									userID: newUserData._id,
									isLogin: true  
								}, 'shhhhh')

								res.status(200).send(token)
							})
							.catch(err => res.status(500).send(err))          
					})
				} else {
					var token = jwt.sign({ 
						userID: userData._id,
						isLogin: true  
					}, 'shhhhh')
					res.status(200).send(token)
				}
			})
			.catch(err => res.status(500).send(err))
	}

}

module.exports = UserCtrl
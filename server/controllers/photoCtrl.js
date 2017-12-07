const jwt   = require("jsonwebtoken")
const Photo = require("../models/photosModel")

class PhotosCtrl {
  
	static createPhoto (req, res) {
		jwt.verify(req.headers.token, "shhhhh", function(err, decoded) {
			if (!decoded.isLogin) {
				res.status(403).send("invalid")
			} else {
				Photo.create({
					title: req.body.title,
					imgurl: "ini link photo",
					user_id: decoded.user_id,
					voter_id: [],
					createdAt: new Date(),
					updatedAt: new Date()
				})
					.then(photoData => res.status(200).send(photoData))
					.catch(err => res.status(500).send(err))
			}
		})
	}

	static getAllPhoto (req, res) {
		Photo.find()
			.then(photosData => res.status(200).send(photosData))
			.catch(err => res.status(500).send(err))
	}

	static updatePhotoById (req, res) {
		jwt.verify(req.headers.token, "shhhhh", function(err, decoded) {
			if (!decoded.isLogin) {
				res.status(403).send("invalid")
			} else {
				Photo.findByIdAndUpdate(req.params.id)
					.then(photoData => {
						photoData.title = req.body.title || photoData.title

						let findIdx = photoData.voter_id.findIndex(element => {
							return element === decoded.user_id
						})

						if (findIdx === -1) {
							photoData.voter_id.push(decoded.user_id)
						} else {
							photoData.voter_id.splice(findIdx, 1)
						}

						photoData.save()
							.then(newPhotoData => {
								newPhotoData.populate("user_id", function(error, newPhoto) {
									res.status(200).send(newPhoto)
								})
							})
							.catch(err => res.status(500).send(err))
					})
					.catch(err => res.status(500).send(err))
			}
		})
	}

	static deletePhotoById (req, res) {
		jwt.verify(req.headers.token, "shhhhh", function(err, decoded) {
			if (!decoded.isLogin) {
				res.status(403).send("invalid")
			} else {
				Photo.findByIdAndRemove(req.params.id)
					.then(deletedPhoto => res.status(200).send(deletedPhoto))
					.catch(err => res.status(500).send(err))
			}
		})
	}
}

module.exports = PhotosCtrl

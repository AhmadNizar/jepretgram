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
					imgurl: null,
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
		
	}
}

module.exports = PhotosCtrl
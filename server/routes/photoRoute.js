const Photo = require("../controllers/photoCtrl")
const route = require("express").Router()

route.get("/", Photo.getAllPhoto)
route.post("/", Photo.createPhoto)
route.put("/:id", Photo.updatePhotoById)
route.delete("/:id", Photo.deletePhotoById)

module.exports = route
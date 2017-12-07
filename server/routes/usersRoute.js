const User   = require("../controllers/usersCtrl")
const router = require("express").Router()

router.post('/register', User.createUser)
router.post('/login', User.loginUser)
router.post('/loginfb', User.loginFB)

module.exports = router
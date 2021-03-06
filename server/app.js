const app        = require("express")()
const bodyParser = require("body-parser")
const mongoose   = require("mongoose")
const logger     = require("morgan")
const cors       = require("cors")
const User       = require("./routes/usersRoute")
const Photo			 = require("./routes/photoRoute")

app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect("mongodb://localhost/ahmadnizar", (err) => {
	err ? console.log("Can\'t connect to database") : console.log("Database connected")
})

app.use("/users", User)
app.use("/photos", Photo)

app.listen(3000, () => {
	console.log("jalan di 3000 tong")
})
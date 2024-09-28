const authControllers = require("../controllers/authControllers")
const express = require("express")
const router = express.Router();


router.post("/signup", authControllers.register)
router.post("/login", authControllers.login)
module.exports = router
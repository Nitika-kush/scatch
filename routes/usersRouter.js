const express = require("express");
const { registerUser,loginUser, logoutUser } = require("../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey i am a user");
});

router.post("/register",registerUser );
router.post('/login',loginUser)
router.get('/logout',logoutUser)

module.exports = router;
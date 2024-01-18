const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      res.status(401).send("User with this email already exists.");
      return;
    }
  
    const user = new User({ name, email, password, role: "voter", });
    await user.save();
    // Delete password field from user object before sending response
    delete user._doc.password;
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering new user. Please try again.");
  }
});

module.exports = router;

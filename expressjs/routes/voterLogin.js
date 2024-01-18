const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send("Incorrect email or password.");
      return;
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      delete user._doc.password;
      res.status(200).send(user);
    } else {
      res.status(401).send("Incorrect email or password.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in please try again.");
  }
});

module.exports = router;

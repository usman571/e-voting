const express = require("express");
const router = express.Router();
const Admin = require("../model/admin");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(401).send("Incorrect email or password ");
      return;
    }
    const isMatch = await admin.comparePassword(password);
    if (isMatch) {
      delete admin._doc.password;
      res.status(200).send(admin);
    } else {
      res.status(401).send("Incorrect email or password.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in please try again.");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Admin = require("../model/admin");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const alreadyAdmin = await Admin.findOne({ email });
    if (alreadyAdmin) {
      res.status(401).send("admin is already with this email address");
      return;
    }
    const admin = new Admin({ email, password, role: "admin" });
    await admin.save();
    res.status(200).send(admin);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering new admin please try again.");
  }
});

module.exports = router;

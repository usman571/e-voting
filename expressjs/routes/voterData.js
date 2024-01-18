const express = require("express");
const router = express.Router();

// Dummy data
const cnicData = {
  1530275718591: {
    name: "Usman khan",
    dob: "18/10/2000",
    location: "haji Abad",
  },
  1530375718591: {
    name: "nadeem",
    dob: "1/5/2005",
    location: "munda",
  },
  1530475718591: {
    name: "khalifa",
    dob: "01/01/1995",
    location: "peto dara",
  },
  1530575718591: {
    name: "numan",
    dob: "01/01/1995",
    location: "balambat",
  },
  1530675718591: {
    name: "saeed",
    dob: "01/01/1995",
    location: "talash",
  },
  1530775718591: {
    name: "mehran",
    dob: "01/01/1997",
    location: "MKD",
  },
  1530875718591: {
    name: "Isa",
    dob: "01/01/1995",
    location: "MKD",
  },
  1530975718591: {
    name: "yahya",
    dob: "01/01/1999",
    location: "Chaman Abad",
  },
};

// Endpoint for retrieving CNIC-related data
router.get("/:cnic", (req, res) => {
  const cnic = req.params.cnic;
  if (cnic in cnicData) {
    const voterData = cnicData[cnic];
    const dob = voterData.dob;
    const dobParts = dob.split("/");
    const dobObj = new Date(
      parseInt(dobParts[2]),
      parseInt(dobParts[1]) - 1,
      parseInt(dobParts[0])
    );
    const ageDiffMs = Date.now() - dobObj.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    const today = new Date();
    const isEligible = age >= 18 && dobObj <= today;
    if (isEligible) {
      res.json(voterData);
    } else {
      res.status(403).send("You are not eligible to vote");
    }
  } else {
    res.status(404).send("CNIC not found");
  }
});

module.exports = router;

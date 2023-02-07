const express = require("express");
const router = express.Router();
const User = require("../modules/login");

const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  res.status(200).send("something went!");
});

router.post("/",
[
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("please provide a password greater than 6 digits"),
  ],
async (req, res) => {
  try {
    const { email, password } = req.body; 
    const findUserIfExist = await User.findOne({ email });
    if (findUserIfExist) {
      return res.status(200).json({
        status: 200,
        message: "Login Successfully",
        data: findUserIfExist,
      });
    } else {
      return res.status(201).json({
        status: 201,
        message: "user not found.",
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "something went wrong try again",
      error: e,
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../modules/login");

const { body, validationResult } = require("express-validator");
router.get("/", async (req, res) => {
  res.status(200).send("something went!");
});

router.post("/sign",
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
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("please provide a password greater than 6 digits"),
      body("phone")
        .trim()
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage("please provide a phone greater than 6 digits"),
        body("username")
          .trim()
          .notEmpty()
          .isLength({ min: 5 })
          .withMessage("please provide a username greater than 6 digits"),
  ],
  async (req, res) => {
    const { email, password,username,phone } = req.body; 
    // try {
      const findUserIfExist = await User.findOne({ email });
      console.log("findUserIfExist",findUserIfExist)
      if (findUserIfExist) {
        return res.status(201).json({
          status: 201,
          message: "user already exist",
          data: findUserIfExist,
        });

      } else {
        var newuser = new User();
        newuser.email = email;
        newuser.password = password;
        newuser.username = username;
        newuser.phone = phone;
        newuser
          .save()
          .then(async () => {
            return res
              .status(200)
              .json({ status: 200, message: "New user Added", data: newuser });
          })
          .catch((e) => {
            return res
              .status(400)
              .json({ status: 400, message: e, status: "Error" });
          });
      }
    // } catch (e) {
    //   res.status(500).send({
    //     message: "something went wrong try again",
    //     error: e,
    //   });
    // }
  }
);

module.exports = router;

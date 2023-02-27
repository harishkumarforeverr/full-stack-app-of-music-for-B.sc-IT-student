const express = require("express");
const router = express.Router();
const User = require("../modules/login");
const UserInfoSchema = require("../modules/UserInfo/UserInfo");
const SongsCategory = require("../modules/songsCategory/songsCategory");
const Songs = require("../modules/songs/songs");
const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("please provide a password greater than 6 digits"),
  ],
  async (req, res) => {
    // try {
      const { email, password } = req.body;
      const findUserIfExist = await User.findOne({ email,password });
      console.log(findUserIfExist)
      if (findUserIfExist) {
        const userInfo = await UserInfoSchema.find({
          userId: findUserIfExist._id,
        });
        console.log("userInfouserInfo", userInfo);
        if (userInfo.length > 0) {
          return res.status(200).json({
            status: 200,
            message: "Login Successfully",
            data: findUserIfExist,
          });
        } else {
          const artistName = await Songs.aggregate([
            { $group: { _id: "$artistName", items: { $push: "$$ROOT" } } },
            { $project: { items: { $slice: ["$items", 1] } } },
            { $unwind: "$items" },
          ]); 
          const category = await SongsCategory.find({});
          const updateData = {
            language: [
              {
                label: "Hindi",
                url: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-4.0.3&q=80&cs=tinysrgb&fm=jpg&crop=entropy",
              },
              {
                label: "Other",
                url: "https://images.unsplash.com/photo-1566842937027-437d91739e89?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwyNzIxODF8MHwxfHNlYXJjaHwxMHx8c29uZ3N8ZW58MHx8fHwxNjc2MzgzMzE1&ixlib=rb-4.0.3&q=80",
              },
            ],
            artist: artistName,
            category,
            type: "new User",
            userId: findUserIfExist._id,
          };
          return res.status(200).json({
            status: 200,
            message: "Login Successfully",
            data: updateData,
          });
        }
      } else {
        return res.status(404).json({
          status: 404,
          message: "user not found.",
        });
      }
    // } catch (e) {
    //   res.status(404).send({
    //     message: "something went wrong try again",
    //     error: e,
    //   });
    // }
  }
);
router.post(
  "/sigin",
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
    const { email, password, username, phone } = req.body;
    // try {
    const findUserIfExist = await User.findOne({ email }); 
    if (findUserIfExist) {
      return res.status(400).json({
        status: 400,
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
router.put(
  "/reset",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("please provide a password greater than 6 digits"),
  ],
  async (req, res) => {
    // try {
      const { email, password } = req.body;
      const findUserIfExist = await User.findOne({ email });
      console.log(findUserIfExist)
      if (findUserIfExist) {
       const updatedData= await User.findOneAndUpdate({ email },{email,password},{
        new: true
      });
       return res.status(200).json({
        status: 404,
        message: "user email updated",
        data: updatedData,
      });
      } else {
        return res.status(200).json({
          status: 404,
          message: "no user found",
          data: findUserIfExist,
        });
      }
    // } catch (e) {
    //   res.status(404).send({
    //     message: "something went wrong try again",
    //     error: e,
    //   });
    // }
  }
);
router.get("/", async (req, res) => {
    const findUserIfExist = await User.find({});
    console.log("findUserIfExist", findUserIfExist);
    return res.status(200).json({
      status: 200,
      message: "user already exist",
      data: findUserIfExist,
    });
  }
);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");

const ObjectId = require("mongodb").ObjectID;
const { body, validationResult } = require("express-validator");
// const ObjectId = require("mongodb").ObjectID;

// router.get("/hi", async (req, res) => {
//   res.status(200).send({
//     signIn: "sucess",
//   });
// });
// router.post(
//   "/",
//   [
//     body("email").isEmail().withMessage("Email must be valid"),
//     body("password")
//       .trim()
//       .notEmpty()
//       .isLength({ min: 5 })
//       .withMessage("please provide a password greater than 6 digits"),
//   ],
//   async (req, res) => {
//     try {
//       let reqBody = req.body;
//       if (req.get("Content-Type") != "application/json") {
//         return res
//           .status(404)
//           .json({ status: 404, message: "Invalid header format" });
//       }
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       if (errors.isEmpty()) {

//       }
//     } catch (error) {
//       return res.status(500).json({ message: "Internal server error." });
//     }
//   }
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const UserInfoSchema = require("../../modules/UserInfo/UserInfo");

router.get("/", async (req, res) => {
  res.status(200).send("something went!");
});

router.get(
  "/:id",
  [body("userId").isEmail().withMessage("userId must be valid")],
  async (req, res) => {
    const { id } = req.params;

    const findUserIfExist = await UserInfoSchema.findOne({
      userId: ObjectId(id),
    });
    if (findUserIfExist) {
     
    } else {
      var newuser = new UserInfoSchema(); 
      newuser.userId = id;
      // newuser.username = username;
      // newuser.phone = phone;
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
  "/:id", 
  async (req, res) => {
    const { id } = req.params;

    const findUserIfExist = await UserInfoSchema.findOne({
      userId: ObjectId(id),
    });
    if (findUserIfExist) {
      console.log("findUserIfExist",findUserIfExist)
      const result =await UserInfoSchema.findOneAndUpdate({userId: ObjectId(id)},{
        favCat:req.body.favCat
      }, { 
        new: true,
      })
      res.status(200).send({ user: result });
    } else { 
      // newuser.username = username;
      // newuser.phone = phone;
      // newuser
      //   .save()
      //   .then(async () => {
      //     return
           res
            .status(201)
            .json({ status: 201, message: "No user found", data:  [] });
        // })
        // .catch((e) => {
        //   return res
        //     .status(400)
        //     .json({ status: 400, message: e, status: "Error" });
        // });
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

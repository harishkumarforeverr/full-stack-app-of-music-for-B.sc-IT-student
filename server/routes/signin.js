// // const express = require("express");
// // const router = express.Router();
// // const jwt = require("jsonwebtoken");
// const { body, validationResult } = require("express-validator");
// // const ObjectId = require("mongodb").ObjectID;

// // router.get("/hi", async (req, res) => {
// //   res.status(200).send({
// //     signIn: "sucess",
// //   });
// // });
// // router.post(
// //   "/",
// //   [
// //     body("email").isEmail().withMessage("Email must be valid"),
// //     body("password")
// //       .trim()
// //       .notEmpty()
// //       .isLength({ min: 5 })
// //       .withMessage("please provide a password greater than 6 digits"),
// //   ],
// //   async (req, res) => {
// //     try {
// //       let reqBody = req.body;
// //       if (req.get("Content-Type") != "application/json") {
// //         return res
// //           .status(404)
// //           .json({ status: 404, message: "Invalid header format" });
// //       }
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ errors: errors.array() });
// //       }
// //       if (errors.isEmpty()) {

// //       }
// //     } catch (error) {
// //       return res.status(500).json({ message: "Internal server error." });
// //     }
// //   }
// // );

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const User = require("../modules/login");

// router.get("/", async (req, res) => {
//   res.status(200).send("something went!");
// });



// module.exports = router;

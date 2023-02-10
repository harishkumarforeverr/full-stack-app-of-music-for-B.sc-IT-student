const express = require("express");
const app = express();
require("dotenv/config");

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("hai there...");
});

//users authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

//Artist routes
const artistsRoutes = require("./routes/artist");
app.use("/api/artists/", artistsRoutes);

// Albums routes
const albumsRoutes = require("./routes/albums");
app.use("/api/albums/", albumsRoutes);

//Songs routes

// const songsRoutes = require("./routes/songs");
// app.use("/api/songs/", songsRoutes);

// const AuthSignRoutes = require("./routes/signin");
// app.use("/api/auth/", AuthSignRoutes);

// const AuthLoginRoutes = ;
app.use("/api/auth/", require("./routes/login"));

app.use("/api/userInfo", require("./routes/UserInfo/UserInfo"))
app.use("/api/songs", require("./routes/songs/songs"))

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });

mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => {
    console.log(`error:${error}`);
  });

app.listen(4000, () => console.log("Listening to port 4000"));

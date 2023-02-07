import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./component/Home"; 

import { app } from "./config/firebase.config";
import { AnimatePresence, motion } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { DashBoard, MusicPlayer } from "./component";

import { getAuth } from "firebase/auth";
import LoginPage from "./component/Auth/Login/LoginPage";
import SignupPage from "./component/Auth/Signup/SignupPage";
import RecommendationCard from "./component/Cards/RecommendationCard";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{ user, isSongPlaying }, dispatch] = useStateValue();
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  // useEffect(() => {
  //   firebaseAuth.onAuthStateChanged((userCred) => {
  //     if (userCred) {
  //       userCred.getIdToken().then((token) => {
  //         //console.log(token);
  //         window.localStorage.setItem("auth", "true");
  //         validateUser(token).then((data) => {
  //           dispatch({
  //             type: actionType.SET_USER,
  //             user: data,
  //           });
  //         });
  //       });
  //     } else {
  //       setAuth(false);
  //       dispatch({
  //         type: actionType.SET_USER,
  //         user: null,
  //       });
  //       window.localStorage.setItem("auth", "false");

  //       navigate("/login");
  //     }
  //   });
  // }, []);

  return (
    <AnimatePresence>
      {/* <div className="h-auto min-w-(680px) bg-primary flex justify-center items-center"> */}
        <Routes>
          {/* <Route path="/login" element={<Login setAuth={setAuth} />} /> */}
          <Route path="/login" element={<LoginPage   />} />
          <Route path="/signup" element={<SignupPage   />} />
          <Route path="/recommendation" element={<RecommendationCard   />} />
          <Route path="/*" element={<Home />} />
          <Route path="/Dashboard/*" element={<DashBoard />} />
        </Routes>

        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      {/* </div> */}
    </AnimatePresence>
  );
}

export default App;

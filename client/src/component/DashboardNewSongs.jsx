import { BsEmojiWink } from "react-icons/bs";
import { motion } from "framer-motion";
import { BiCloudUpload } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { Button, Input, Select } from "antd";
function Alert({ type }) {
  return (
    <motion.div
      initial={{ translatex: 200, opacity: 0 }}
      animate={{ translatex: 0, opacity: 1 }}
      exit={{ translatex: 200, opacity: 0 }}
      key={type}
      className={`fixed top-12 right-12 px-4 py-2 rounded-md backdrop-blur-md flex items-center justify-center shadow-xl
      ${type === "success" && "bg-green-700"}
       ${type === "danger" && "bg-red-600"}
      }`}
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiWink className="text-3xl text-primary " />
          <p className="text-xl font-semibold text-primary">
            {" "}
            Data uploaded Successfully{" "}
          </p>
        </div>
      )}

      {type === "danger" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiWink className="text-3xl text-primary " />
          <p className="text-xl font-semibold text-primary">
            {" "}
            Somethnig went wrong... please try again later
          </p>
        </div>
      )}
    </motion.div>
  );
}
const firebaseConfig = {
  apiKey: "AIzaSyAcT8FruMRtGYmO44IOWTuHWAuVnqX5XXs",
  authDomain: "musicapp-23d21.firebaseapp.com",
  databaseURL: "https://musicapp-23d21-default-rtdb.firebaseio.com",
  projectId: "musicapp-23d21",
  storageBucket: "musicapp-23d21.appspot.com",
  messagingSenderId: "1021788993009",
  appId: "1:1021788993009:web:4add8131b396bbe4ecc050",
  measurementId: "G-3DYJ01LDTP",
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export const FileLoader = ({ progress }) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {Math.round(progress) > 0 && Math.round(progress) < 100 && (
        <>
          <div className="w-full h-full flex flex-col items-center justify-center ">
            <p
              style={{
                position: "absolute",
                top: "50%",
              }}
              className="text-xl font-semibold text-textColor "
            >
              {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
            </p>
            <div className="w-20 h-20 min-w-[40px] bg-red-700 animate-ping rounded-full flex items-center justify-center relative ">
              <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export const GetUrlFromFireBase = ({ setUrl, type }) => {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState("");
  const [uploadAlertModel, setuploadAlertModel] = useState(false);
  const handleChange = (e) => {
    const uploadfile = e.target.files[0];
    if (uploadfile) {
      setFile(uploadfile);
      setUrl("");
      const storageRef = ref(
        storage,
        `${type === "image" ? "songs" : "image"}/${uploadfile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, uploadfile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            console.log("downloadURL", downloadURL);
            setuploadAlertModel(true);
            setTimeout(() => {
              setuploadAlertModel(false);
            }, 4000);
          });
        }
      );
    }
  };
  return (
    <>
      {uploadAlertModel && <Alert type={"success"} />}
      <>
        <label
          style={{
            display: "grid",
            justifyContent: "center",
            margin: "1rem 0",
            fontSize: "1rem",
            cursor: "pointer",
            alignItems: "center",
            boxShadow:
              " box-shadow: 0 6px 16px -8px #00000014, 0 9px 28px #0000000d, 0 12px 48px 16px #00000008",
            paddingBottom: "3rem",
            paddingTop: "1rem",
            background: "white",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <FileLoader progress={progress} />
          </div>
          <div className="">
            <div className="">
              <p
                style={{
                  display: "grid",
                  justifyContent: "center",
                  margin: "0",
                  fontSize: "2.5rem",
                }}
              >
                <BiCloudUpload />
              </p>
              <p
                style={{
                  display: "grid",
                  justifyContent: "center",
                  margin: "1.52rem",
                  fontSize: "1.3rem",
                }}
              >
                click to upload {type == "image" ? "image" : "song"}
              </p>
            </div>
          </div>
          <input
            type="file"
            name="Upload-file"
            accept={`${type === "image" ? "image/*" : "audio/*"}`}
            className={"w-0 h-0"}
            onChange={handleChange}
          />
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0",
              fontSize: "1rem",
            }}
          >
            {file.name}
          </p>
        </label>
      </>
    </>
  );
};
// const DashboardNewSongs = () => {
//   const [url, setUrl] = useState("");
//   const [url1, setUrl1] = useState("");
//   useEffect(() => {
//     console.log("urlurlurl", url);
//   }, [url]);
//   return (
//     <>
//       <GetUrlFromFireBase setUrl={setUrl} type="song" />
//       {url}
//       <GetUrlFromFireBase setUrl={setUrl1} type="image" />
//       {url1}
//     </>
//   );
// };
// Hip Hop
// Rock Song
// Romatic Song
// Rock
// Party Song
// Sad Song
const options = [
  {
    value: "HipHop",
    label: "Hip Hop",
  },
  {
    value: "RockSong",
    label: "Rock Song",
  },
  {
    value: "RomaticSong",
    label: "Romatic Song",
  },
  {
    value: "Rock",
    label: "Rock",
  },
  {
    value: "SadSong",
    label: "Sad Song",
  },
];
const DashboardNewSongs = () => {
  const [artistName, setArtistName] = useState("");
  const [artistImage, setArtistImage] = useState("");
  const [songName, setSongName] = useState("");
  const [songImage, setSongImage] = useState("");
  const [song, setSong] = useState("");
  const [category, setcategory] = useState("");
  const submit = () => {
    if (
      artistName &&
      artistImage &&
      songName &&
      songImage &&
      song &&
      category
    ) {
      const updateData = {
        artistName,
        artistImage,
        songName,
        songImage,
        song,
        category,
      };
      console.log("updateData", updateData);
    }
  };
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          rowGap: "2.2rem",
          columnGap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <h1>Enter The Artists Name</h1>
            <Input
              style={{
                width: "100%",
              }}
              placeholder="enter the artist name"
              value={artistName}
              onChange={(e) => {
                const { value } = e.target;
                setArtistName(value);
              }}
            />
          </div>
          <div>
            <h1>Enter The Song Name</h1>
            <Input
              style={{
                width: "100%",
              }}
              placeholder="enter the song name"
              value={songName}
              onChange={(e) => {
                const { value } = e.target;
                setSongName(value);
              }}
            />
          </div>
          <div>
            <h1>Enter The Song type</h1>
            <Select
              placeholder="enter the category name"
              style={{
                width: "100%",
              }}
              onChange={(e) => {
                setcategory(e);
              }}
              options={options}
            />
          </div>
        </div>

        <div>
          <h1>upload The Artists Image</h1>
          <GetUrlFromFireBase setUrl={setArtistImage} type="image" />
        </div>
        <div>
          <h1>upload The Song Image</h1>
          <GetUrlFromFireBase setUrl={setSongImage} type="image" />
        </div>
        <div>
          <h1>upload The Song </h1>
          <GetUrlFromFireBase setUrl={setSong} type="song" />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0",
          fontSize: "1rem",
          marginTop: "2rem",
        }}
      >
        <Button
          style={{
            background: "#F06E38",
            borderRadius: "5px",
            color: "white",
            width: "7rem",
            height: "3rem",
          }}
          onClick={submit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default DashboardNewSongs;

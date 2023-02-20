import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import AudioPlayer from "react-h5-audio-player";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import "react-h5-audio-player/lib/styles.css";
import DashboardNewSongs from "./DashboardNewSongs";
import "./DashboardSongs.css";
import { updateLastListenedSong } from "./apis/updateUserInfo";

const { Meta } = Card;
function DashboardAllSongs() {
  const [songs, setSongs] = useState([]);
  const getSongs = async () => {
    const res = await axios.get("http://localhost:4000/api/songs");
   
    setSongs(res.data.data);
  };
 
  useEffect(() => {
    getSongs(); 
  }, []);
  const [play, setPlay] = useState("");
  const [view, setView] = useState("songs");
  const handleTheSongChange = (id, sign) => {
    const index = songs.findIndex(({ _id }) => {
      let bool = _id == id;
      console.log(id, _id, bool);
      return bool;
    });
    console.log("songsong", index);
    if (index == 0) {
      let i = 0;
      if (sign == "+") {
        i = index + 1;
      } else {
        i = songs.length - 1;
      }
      const newObj = { ...songs[i] };
      setPlay(newObj);
    } else if (index === songs.length - 1) {
      let i = 0;
      if (sign == "+") {
        i = 0;
      } else {
        i = index - 1;
      }
      const newObj = { ...songs[i] };
      setPlay(newObj);
    } else {
      let ii = null;
      if (sign == "+") ii = Number(index) + Number(1);
      else ii = Number(index) - Number(1);
      const newObj = { ...songs[ii] };
      console.log("newObjnewObj", ii, index);
      setPlay(newObj);
    }
  };
  return (
    <>
      {view == "songs" && (
        <div>
          <Button
            onClick={() => {
              setView("addSongs");
            }}
          >
            {" "}
            Add New
          </Button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "2rem",
            }}
          >
            {songs.map((song) => {
              return (
                <div>
                  <Card
                    onClick={() => {
                      setPlay(song);
                      updateLastListenedSong(song.category,localStorage.getItem("userId"))
                    }}
                    hoverable
                    style={{
                      width: 240,
                    }}
                    cover={
                      <img
                        style={{
                          width: "100%",
                          height: "10rem",
                        }}
                        src={song.songImage}
                        alt="images"
                      />
                    }
                  >
                    {/* <Meta
                title={song.songName}
                description={song.category}
              /> */}
                    <p>song: {song.songName} </p>
                    <p>category: {song.category} </p>
                    <p>artist: {song.artistName} </p>
                  </Card>
                </div>
              );
            })}
          </div>
          {play !== "" && (
            <div className="musicplayerConatiner">
              <div className="songsDeatiles">
                <p><span>Song Name </span>: {play.songName} </p>
                <p><span>Category </span>: {play.category} </p>
                <p><span>Artist </span>: {play.artistName} </p>
                <p  style={{
                  cursor:"pointer"
                }}>
                  <span>Download</span> : <DownloadOutlined />
                </p>
              </div>
              <AudioPlayer
                autoPlay
                src={play.song}
                onPlay={(e) => console.log("onPlay")}
                showSkipControls={true}
                onClickNext={() => {
                  handleTheSongChange(play._id, "+");
                }}
                onClickPrevious={() => {
                  handleTheSongChange(play._id, "-");
                }}
              />
            </div>
          )}
        </div>
      )}
      {view == "addSongs" && (
        <div>
          {" "}
          <h1> Add New Song </h1>
          <Button
            onClick={() => {
              setView("songs");
              getSongs();
            }}
          >
            {" "}
            Back
          </Button>
          <DashboardNewSongs setView={setView} getSongs={getSongs} />
        </div>
      )}
    </>
  );
}

// export const SongContainer = ({ data }) => {
//   return (
//     <div className="w-full flex flex-wrap gap-3 items-center justify-evenly ">
//       {data &&
//         data.map((song, i) => (
//           <SongCard key={song._id} data={song} index={i} type="song" />
//         ))}
//     </div>
//   );
// };

export default DashboardAllSongs;

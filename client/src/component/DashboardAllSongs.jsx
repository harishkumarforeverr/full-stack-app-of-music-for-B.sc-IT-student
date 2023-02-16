import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import AudioPlayer from "react-h5-audio-player";
import { useNavigate } from "react-router-dom";
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
                      setPlay(song.song);
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
              <AudioPlayer
                autoPlay
                src={play}
                onPlay={(e) => console.log("onPlay")}
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

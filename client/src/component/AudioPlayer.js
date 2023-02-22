import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./DashboardSongs.css";
import { updateLastListenedSong } from "./apis/updateUserInfo";

function AudioPlayerComp({ songs }) {
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
                      updateLastListenedSong(
                        song.category,
                        localStorage.getItem("userId")
                      );
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
               
               <div>
                 <img style={{
                   width:"80%"
                 }} src={play.songImage} alt="ok" />
               </div>
               <div style={{
                 flexBasis:"70%"
               }}>
                 <p>{play.songName}</p>
                 <p> {play.artistName}</p>
               </div>


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

export default AudioPlayerComp;

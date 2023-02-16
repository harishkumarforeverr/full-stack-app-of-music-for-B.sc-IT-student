// import React from "react";
// import AudioPlayer from "react-h5-audio-player";

// const AudioPlayerComp = ({ play }) => {
//   return (
//     <div className="musicplayerConatiner">
//       <AudioPlayer autoPlay src={play} onPlay={(e) => console.log("onPlay")} />
//     </div>
//   );
// };
// export default AudioPlayerComp;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import AudioPlayer from "react-h5-audio-player"; 
import "react-h5-audio-player/lib/styles.css"; 
import "./DashboardSongs.css";
import { updateLastListenedSong } from "./apis/updateUserInfo";
 
function AudioPlayerComp({songs}) { 
 

 
  const [play, setPlay] = useState("");
  const [view, setView] = useState("songs");
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
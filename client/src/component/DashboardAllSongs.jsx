import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import AudioPlayer from "react-h5-audio-player";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location=useLocation();
  useEffect(()=>{
    
  if(location&&location?.state&&location?.state?.song){
    console.log("sssssssssss",location)
    setPlay(location.state.song);
    updateLastListenedSong(
      location.state.song.category,
      localStorage.getItem("userId")
    );
  }

  },[location])
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
                    {/* <Meta
                title={song.songName}
                description={song.category}
              /> */}
                    <p
                      style={{
                        color: "rgba(14, 22, 176, 0.806)",
                        fontFamily: "Open Sans",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textDecoration: "bold",
                        margin: "0 auto",
                      }}
                    >
                      Song: {song.songName}{" "}
                    </p>

                    <p
                      style={{
                        color: "rgba(14, 22, 176, 0.806)",
                        fontFamily: "Open Sans",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textDecoration: "bold",
                        margin: "0 auto",
                      }}
                    >
                      Category: {song.category}{" "}
                    </p>
                    <p
                      style={{
                        color: "rgba(14, 22, 176, 0.806)",
                        fontFamily: "Open Sans",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textDecoration: "bold",
                        margin: "0 auto",
                      }}
                    >
                      Artist: {song.artistName}{" "}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
          {play !== "" && (
            <div className="musicplayerConatiner">
              <div className="songsDeatiles">
                <div>
                  <img
                    style={{
                      width: "80%",
                    }}
                    src={play.songImage}
                    alt="ok"
                  />
                </div>
                <div
                  style={{
                    flexBasis: "70%",
                  }}
                >
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

export default DashboardAllSongs;

import { Button, Card, Divider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import { updateLastListenedSong } from "./apis/updateUserInfo";
import AudioPlayerComp from "./AudioPlayer";

import "./DashboardArtists.scss";
const { Meta } = Card;
const CustomCards = ({ label, url, selected, index, onClick }) => (
  <Card
    onClick={() => {
      onClick(index);
    }}
    className={selected ? "selectedClass" : ""}
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src={url} />}
  >
    <Meta title={label} description={""} />
  </Card>
);

const DashboardArtists = () => {
  const location = useLocation();
  const [language, setLanguage] = useState([]);
  const [category, setCategory] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState([]);
  const [view, setView] = useState("viewOne");
  const getSongs = async () => {
    const res = await axios.get("http://localhost:4000/api/songs/artist");
    console.log("jvdhsvad", res);
    // setArtist(res.data.data);
    const updatedartist = res.data.data?.map(({ items }) => ({
      label: items?.artistName,
      url: items?.artistImage,
      selected: false,
    }));

    setArtist(updatedartist);
  };
  useEffect(() => {
    getSongs();
  }, []);

  const handleTheSelectLanguage = async (index, type, label) => {
    const updatedartist = artist?.map((obj, i) => {
      if (index == i) {
        return {
          ...obj,
          selected: true,
        };
      }
      return {
        ...obj,
        selected: false,
      };
    });
    setArtist(updatedartist);
    const url = "http://localhost:4000/api/songs/artistList/" + label;

    const res = await axios.get(url);
    console.log("jvdhsdsaaaavad", res);

    const data = res.data.data;
    setSongs(data);
  };

  return (
    <div>
      {view == "viewOne" && (
        <>
          <h1>Select the Artists</h1>
          <div className="customCards spaceBtn">
            {" "}
            {artist?.map(({ label, url, selected }, index) => {
              return (
                <CustomCards
                  key={index}
                  onClick={(index) => {
                    handleTheSelectLanguage(index, "artist", label);
                    setView("play");
                  }}
                  label={label}
                  url={url}
                  selected={selected}
                  index={index}
                />
              );
            })}
          </div>
        </>
      )}
      {view == "play" && (
        <>
          <Button
            onClick={() => {
              setView("viewOne");
            }}
          >
            Back
          </Button>
          <AudioPlayerComp songs={songs} />
        </>
      )}
    </div>
  );
};

export default DashboardArtists;

// export default DashboardArtists;

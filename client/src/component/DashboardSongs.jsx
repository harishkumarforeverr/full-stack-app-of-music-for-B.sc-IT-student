import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../Context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import SongCard from "./SongCard";

function DashboardSongs() {
  const [songFilter, setSongFilter] = useState("");
  const [isfocus, setisfocus] = useState(false);
  const [{ allSongs }, dispath] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispath({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        });
      });
    }
  });

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink
          to={"/dashboard/newSong"}
          className="flex items-center justify-center px-4 py-3 border-blue-300 hover:border-blue-500 hover:shadow-md cursor-pointer"
        >
          <IoAdd />
        </NavLink>
        <input
          type="text"
          className={`w-52 px-4 py-2 border ${
            isfocus ? "border-blue-500 shadow-md" : "border-blue-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold `}
          placeholder="Search Here.."
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => {
            setisfocus(false);
          }}
          onFocus={() => {
            setisfocus(true);
          }}
        />
        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer " />
        </i>
      </div>
      {/*main container */}
      <div className="relative w-full my-4 p-4 py-16 border border-blue-400 rounded-md">
        {/* The count */}
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count :{" "}
            </span>
            {allSongs?.length}
          </p>
        </div>
        <SongContainer data={allSongs} />
      </div>
    </div>
  );
}

export const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly ">
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="song" />
        ))}
    </div>
  );
};

export default DashboardSongs;

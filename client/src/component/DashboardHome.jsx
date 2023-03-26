import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { bgColors } from "../utils/styles";

export const DashboardCard = ({ icon, name, count, onClick }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      onClick={onClick}
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashBoardHome = () => {
  const navigator = useNavigate();
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      {/* prettier-ignore */}

      {/* prettier-ignore */}
      <DashboardCard onClick={()=>{
        navigator("/Dashboard/allsongs")
      }} icon={<GiLoveSong className="text-3xl text-textColor" />} name={"All Songs"}   />
      <DashboardCard
        onClick={() => {
          navigator("/Dashboard/songs");
        }}
        icon={<GiLoveSong className="text-3xl text-textColor" />}
        name={"Recommed Song"}
      />

      {/* prettier-ignore */}
      <DashboardCard
       onClick={()=>{
        navigator("/Dashboard/artist")
      }}
       icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artist"}  />

      {/* prettier-ignore */}
      <DashboardCard 
       onClick={()=>{
        navigator("/Dashboard/albums")
      }}
      icon={<GiMusicalNotes className="text-3xl text-textColor" />} name={"Album"}  />

    
    </div>
  );
};

export default DashBoardHome;

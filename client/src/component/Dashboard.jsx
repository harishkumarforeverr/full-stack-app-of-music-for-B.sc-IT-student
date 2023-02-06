import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Header from "./Header";

import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardHome from "./DashboardHome";
import DashboardUsers from "./DashboardUsers";
import DashboardSongs from "./DashboardSongs";
import DashboardArtists from "./DashboardArtists";
import DashboardAlbums from "./DashboardAlbums";
import { Alert, DashboardNewSongs } from ".";
import { useStateValue } from "../Context/StateProvider";

function Dashboard() {
  const [{ alertType }, dispath] = useStateValue();
  return (
    <div className="w-full h-auto  flex flex-col items-center justify-center bg-blue-100">
      <Header />
      <div className="w-[60%] my-2 bg-red-200 p-4 flex items-center justify-evenly">
        <NavLink
          to={"/Dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <IoHome className="text-2x1 text-textColor" />{" "}
        </NavLink>
        <NavLink
          to={"/Dashboard/user"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Users
        </NavLink>

        <NavLink
          to={"/Dashboard/songs"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Songs
        </NavLink>

        <NavLink
          to={"/Dashboard/artist"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Artists
        </NavLink>

        <NavLink
          to={"/Dashboard/albums"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Albums
        </NavLink>
      </div>
      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUsers />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artist" element={<DashboardArtists />} />
          <Route path="/albums" element={<DashboardAlbums />} />
          <Route path="/newSong" element={<DashboardNewSongs />} />
        </Routes>
      </div>
      {alertType && <Alert type={alertType} />}
    </div>
  );
}

export default Dashboard;

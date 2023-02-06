import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const FilterButton = ({ filterData, flag }) => {
  const [filterName, setfilterName] = useState(null);
  const [filterMenu, setfilterMenu] = useState(false);
  const [{ artistFilter, albumFilter, filterTerm, languageFilter }, dispatch] =
    useStateValue();
  const updateFilterButton = (name) => {
    setfilterMenu(false);
    setfilterName(name);

    if (flag === "Artist") {
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: name });
    }

    if (flag === "Album") {
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
    }

    if (flag === "Language") {
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name });
    }

    if (flag === "Category") {
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name });
    }
  };
  return (
    <div className="border bordebl rounded-md px-4 relative cursor-pointer hover:border-green-600">
      <p
        className="text-base tracking-wide text-textColor flex items-center gap-2"
        onClick={() => setfilterMenu(!filterMenu)}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 15
              ? `${filterName.slice(0, 14)}...`
              : filterName}
          </>
        )}
        <IoChevronDown
          className={`text-base text-textColor duration-150 transition-all ease-in-out ${
            filterMenu ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>
      {filterData && filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-thin scrollbar-thumb-gray-400 py2 flex flex-col rounded-md shadow-md absolute top-8 left-0"
        >
          {filterData?.map((data) => (
            <div
              key={data.name}
              className="flex items-center gap-2 px-4 py-1 hover: bg-gray-300"
              onClick={() => updateFilterButton(data.name)}
            >
              {(flag === "Artist" || flag === "Album") && (
                <img
                  src={data.imageURL}
                  className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                  alt=""
                />
              )}
              <p className="w-full">
                {data.name.length > 15
                  ? `${data.name.slice(0, 15)}...`
                  : data.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButton;

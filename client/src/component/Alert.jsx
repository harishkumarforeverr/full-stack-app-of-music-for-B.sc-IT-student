import React from "react";
import { BsEmojiWink } from "react-icons/bs";
import { motion } from "framer-motion";

function Alert({ type }) {
  return (
    <motion.div
      initial={{ translatex: 200, opacity: 0 }}
      animate={{ translatex: 0, opacity: 1 }}
      exit={{ translatex: 200, opacity: 0 }}
      key={type}
      className={`fixed top-12 right-12 px-4 py-2 rounded-md backdrop-blur-md flex items-center justify-center shadow-xl
      ${type === "success" && "bg-green-700"}
       ${type === "danger" && "bg-red-600"}
      }`}
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiWink className="text-3xl text-primary " />
          <p className="text-xl font-semibold text-primary"> Data Saved </p>
        </div>
      )}

      {type === "danger" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiWink className="text-3xl text-primary " />
          <p className="text-xl font-semibold text-primary">
            {" "}
            Somethnig went wrong... please try again later
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default Alert;

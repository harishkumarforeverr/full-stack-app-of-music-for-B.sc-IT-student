import axios from "axios";
const userId = localStorage.getItem("userId");
// userId
const url = "http://localhost:4000/api/userInfo/"

export const updateLastListenedSong = async (category,id) => {
  console.log("userIduserId",userId)
  const res = await axios.put(url + "/"+id+"/"+ category);
};

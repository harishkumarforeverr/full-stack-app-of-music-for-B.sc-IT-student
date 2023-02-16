// import React, { useEffect } from "react";
// import { getAllArtist } from "../api";
// import { actionType } from "../Context/reducer";
// import { useStateValue } from "../Context/StateProvider";
// import SongCard from "./SongCard";

// function DashboardArtists() {
//   const [{ allArtists }, dispath] = useStateValue();
//   useEffect(() => {
//     if (!allArtists) {
//       getAllArtist().then((data) => {
//         dispath({ type: actionType.SET_ALL_ARTISTS, allArtists: data.artist });
//       });
//     }
//   });
//   return (
//     <div className="w-full p-4 flex items-center justify-center flex-col">
//       <div className="relative w-full my-4 p-4 py-16 border border-blue-400 rounded-md">
//         <ArtistContainer data={allArtists} />
//       </div>
//     </div>
//   );
// }

// export const ArtistContainer = ({ data }) => {
//   console.log(data);
//   return (
//     <div className="w-full flex flex-wrap gap-3 items-center justify-evenly ">
//       {data &&
//         data?.map((song, i) => (
//           <SongCard key={song._id} data={song} index={i} type="artist" />
//         ))}
//     </div>
//   );
// };
import { async } from "@firebase/util";
import { Button, Card, Divider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import AudioPlayerComp from "./AudioPlayer";
 
import "./DashboardArtists.scss";
const { Meta } = Card;
const CustomCards = ({ label, url, selected,index,onClick }) => (
  <Card
  onClick={()=>{
    onClick(index)
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
  const [songs,setSongs]=useState([])
  const [view, setView] = useState("viewOne");
  const [artist, setArtist] = useState([]);
  const getSongs = async () => {
    const res = await axios.get("http://localhost:4000/api/songs/category");
    console.log("jvdhsvad", res);
    // setArtist(res.data.data);
    const updatedartist = res.data.data?.map(({ value,url }) => ({
      label:value,
      url ,
      selected: false,
    }));

    setArtist(updatedartist);
  };
  useEffect(()=>{getSongs()},[])
  // useEffect(() => {
    
  // console.log("updatedartistupdatedartist",artist)
  //   // const { language, category, artist } = location?.state?.data??{};
  //   // const updatedLanguage = language?.map(({ label, url }) => ({
  //   //   label,
  //   //   url,
  //   //   selected: false,
  //   // }));
  //   // const updatedcategory = category?.map(({ value, url }) => ({
  //   //   label:value,
  //   //   url,
  //   //   selected: false,
  //   // }));
  //   const updatedartist = artist?.map(({ items }) => ({
  //     label: items?.artistName,
  //     url: items?.artistImage,
  //     selected: false,
  //   }));
  //   // console.log(
  //   //   "updatedLanguage",
  //   //   updatedLanguage,
  //   //   updatedartist,
  //   //   updatedcategory
  //   // );
  //   // setLanguage(updatedLanguage);
  //   // setCategory(updatedcategory);
  //   setArtist(updatedartist);
  // }, [artist]);
  const handleTheSelectLanguage = async(index, type,label) => {
   
      const updatedcategory = category?.map((obj, i) => {
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
      setCategory(updatedcategory);
      const url="http://localhost:4000/api/songs/category/"+label;
  
      const res = await axios.get(url);
      console.log("jvdhsdsaaaavad", res);
    
      const data=res.data.data;
      setSongs(data)
  };
  // const navigator=useNavigate()
  // const handleTheSubmit=async()=>{
  //   const updatedlanguage=language.filter(({selected})=>selected);
  //   const updatedcategory=category.filter(({selected})=>selected);
  //   const updatedartist=artist.filter(({selected})=>selected);
  //   if(updatedlanguage.length>0&&updatedcategory.length>0&&updatedartist.length>0){
  //     const updatedData={
  //       language:updatedlanguage,
  //       category:updatedcategory,
  //       artist:updatedartist
  //     } 
  //     const userId=localStorage.getItem("userId")
  //     const res=await axios.post("http://localhost:4000/api/userInfo/"+userId,{
  //       favCat:updatedData
  //     })
  //     if(res.status==200){
  //       navigator("/Dashboard/home")
  //     }
      
  //   }
  // }
  return (
    <div>
   
   {view == "viewOne" && (
        <>
      <h1> select the Artists</h1>
      <div className="customCards spaceBtn">
        {" "}
        {artist?.map(({ label, url, selected },index) => {
          return <CustomCards key={index} onClick={(index)=>{
              handleTheSelectLanguage(index,"artist",label)
              setView("play")
            }} label={label} url={url} selected={selected} index={index} />;
        })}
      </div> 
      </>)
   }
      {view == "play" && (
        <>
        <Button onClick={()=>{setView("viewOne")}}>Back</Button>
          <AudioPlayerComp songs={songs} />
        </>
      )}
    </div>
  );
};

export default DashboardArtists;


// export default DashboardArtists;

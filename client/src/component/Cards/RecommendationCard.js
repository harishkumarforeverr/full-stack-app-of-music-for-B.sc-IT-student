import { Button, Card, Divider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../../components";
import "./RecommendationCard.scss";
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

const RecommendationCard = () => {
  const location = useLocation();
  const [language, setLanguage] = useState([]);
  const [category, setCategory] = useState([]);
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    const { language, category, artist } = location.state.data;
    const updatedLanguage = language.map(({ label, url }) => ({
      label,
      url,
      selected: false,
    }));
    const updatedcategory = category.map(({ value, url }) => ({
      label:value,
      url,
      selected: false,
    }));
    const updatedartist = artist.map(({ items }) => ({
      label: items.artistName,
      url: items.artistImage,
      selected: false,
    }));
    console.log(
      "updatedLanguage",
      updatedLanguage,
      updatedartist,
      updatedcategory
    );
    setLanguage(updatedLanguage);
    setCategory(updatedcategory);
    setArtist(updatedartist);
  }, [location]);
  const handleTheSelectLanguage = (index, type) => {
    if (type == "language") {
      const updatedLanguage = language.map((obj, i) => {
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
      setLanguage(updatedLanguage);
    }
    if (type == "category") {
      const updatedcategory = category.map((obj, i) => {
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
    }
    if (type == "artist") {
      const updatedartist = artist.map((obj, i) => {
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
    }
  };
  const navigator=useNavigate()
  const handleTheSubmit=async()=>{
    const updatedlanguage=language.filter(({selected})=>selected);
    const updatedcategory=category.filter(({selected})=>selected);
    const updatedartist=artist.filter(({selected})=>selected);
    if(updatedlanguage.length>0&&updatedcategory.length>0&&updatedartist.length>0){
      const updatedData={
        language:updatedlanguage,
        category:updatedcategory,
        artist:updatedartist
      } 
      const userId=localStorage.getItem("userId")
      const res=await axios.post("http://localhost:4000/api/userInfo/"+userId,{
        favCat:updatedData
      })
      if(res.status==200){
        navigator("/Dashboard/home")
      }
      
    }
  }
  return (
    <div>
      <h1> select the language</h1>
      <div className="customCards">
        {" "}
        {language.map(({ label , url, selected },index) => {
          return (
            <CustomCards  key={index}
            onClick={(index)=>{
              handleTheSelectLanguage(index,"language")
            }}
              label={label} 
              index={index}
              url={url}
              selected={selected}
            />
          );
        })}
      </div>
      <Divider />

      <h1> select the category</h1>
      <div className="customCards spaceBtn">
        {" "}
        {category.map(({ label, url, selected },index) => {
          return <CustomCards  key={index} onClick={(index)=>{
              handleTheSelectLanguage(index,"category")
            }} label={label} url={url} selected={selected} index={index} />;
        })}
      </div>
      <Divider />

      <h1> select the Artists</h1>
      <div className="customCards spaceBtn">
        {" "}
        {artist.map(({ label, url, selected },index) => {
          return <CustomCards key={index} onClick={(index)=>{
              handleTheSelectLanguage(index,"artist")
            }} label={label} url={url} selected={selected} index={index} />;
        })}
      </div>
      <Divider />
      <div className="recommedButton_container">
        <CustomButton
          className="recommedButton"
          type="primary"
          htmlType="submit"
          onClick={handleTheSubmit}
        >
          submit
        </CustomButton>
      </div>
    </div>
  );
};

export default RecommendationCard;

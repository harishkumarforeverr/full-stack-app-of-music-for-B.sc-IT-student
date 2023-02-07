import { Button, Card, Divider } from "antd";
import React,{useState} from "react";
import { CustomButton } from "../../components";
import "./RecommendationCard.scss";
const { Meta } = Card;
const CustomCards = ({ value, description, url, selected }) => (
  <Card
    className={selected ? "boxshadow" : ""}
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src={url} />}
  >
    <Meta title={value} description={description} />
  </Card>
);
const listObj = {
  language: [
    {
      selected: false,
      value: "hindi",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "other",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ],
  category: [
    {
      selected: true,
      value: "Romantic Songs (20)",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "hipup Songs (20)",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "honey sing Songs (20)",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "sad Songs (20)",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "love Songs (20)",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "top Songs (20)",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "trending Songs (20)",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ],
  Artists: [
    {
      selected: false,
      value: "Arijit Singh",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      description: "ssssss",
      value: "Pritam",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "Vishal-Shekhar",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "Armaan Malik",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "Lata Mangeshkar",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      selected: false,
      value: "Amit Trivedi",
      description: "ssssss",
      url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ],
};
const RecommendationCard = () => {
  const [list,setList]=useState(listObj)
  
  return (
    <div>
      <h1> select the language</h1>
      <div className="customCards">
        {" "}
        {list.language.map(({ value, description, url, selected }) => {
          return (
            <CustomCards
              value={value}
              description={description}
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
        {list.category.map(({ value, description, url, selected }) => {
          return (
            <CustomCards
              value={value}
              description={description}
              url={url}
              selected={selected}
            />
          );
        })}
      </div>
      <Divider />

      <h1> select the Artists</h1>
      <div className="customCards spaceBtn">
        {" "}
        {list.Artists.map(({ value, description, url, selected }) => {
          return (
            <CustomCards
              value={value}
              description={description}
              url={url}
              selected={selected}
            />
          );
        })}
      </div>
      <Divider />
      <div className="recommedButton_container">
        <CustomButton
        className="recommedButton"
         type="primary" htmlType="submit">
          Login
        </CustomButton>
      </div>
    </div>
  );
};

export default RecommendationCard;

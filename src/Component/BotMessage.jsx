import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import Loading from "./Loading";
import axios from 'axios';

const BotMessage = ({ uuid, message }) => {

  const [loading, setloading] = useState(true);
  let socket;

  useState(() => {

    setTimeout(() => {
      setloading(false);
      // callUtility();
    }, 400);

  }, []);

  // const callUtility = async () => {
  //   const response = await axios.get("/sumof2");
  //   console.log(response);
  // };

  return (
    <div className="bot-message-container">
      <Avatar variant="circular" className="botAvatar">
        <FaRobot />
      </Avatar>
      <div className="botMessage">
        {loading ? <Loading /> : <span>{message}</span>}
      </div>
    </div>
  );
};

export default BotMessage;

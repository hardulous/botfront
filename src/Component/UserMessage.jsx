import { Avatar } from "@material-ui/core";
import React from "react";
import { FaUser } from "react-icons/fa";

const UserMessage = ({ uuid, message }) => {
  return (
    <div className="user-message-container">
      <div className="userMessage">
        <span>{message}</span>
      </div>
      <Avatar variant="circular" className="botAvatar">
        <FaUser />
      </Avatar>
    </div>
  );
};

export default UserMessage;

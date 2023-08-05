import React, { useState, useEffect, useContext } from "react";
import { UserInformationContext } from "../../context/UserTokenProvider";
import { Link } from "react-router-dom";
import styles from "./AllMessage.module.css";

const AllMessage = () => {
  const { token } = useContext(UserInformationContext);
  const [chattedUsers, setChattedUsers] = useState([]);

  useEffect(() => {
    const fetchChattedUsers = async () => {
      try {
        const response = await fetch(
          "https://techmeetappwebapi.onrender.com/api/Message?Container=allMessages",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setChattedUsers(data);
      } catch (error) {
        console.error("Error fetching chatted users:", error);
      }
    };

    fetchChattedUsers();
  }, [token]);

  // Function to group messages by recipient (recipientUsername)
  const groupMessagesByRecipient = (messages) => {
    const groupedMessages = {};
    messages.forEach((message) => {
      const recipientUsername = message.recipientUsername.toLowerCase();
      if (!groupedMessages[recipientUsername]) {
        groupedMessages[recipientUsername] = [];
      }
      groupedMessages[recipientUsername].push(message);
    });

    // Sort messages for each recipient by messageSent timestamp in ascending order
    Object.values(groupedMessages).forEach((messages) => {
      messages.sort((a, b) => new Date(a.messageSent) - new Date(b.messageSent));
    });

    return groupedMessages;
  };

  // Group messages by recipient
  const groupedMessages = groupMessagesByRecipient(chattedUsers);

  // Function to get the last message from the conversation
  const getLastMessage = (messages) => {
    return messages[messages.length - 1];
  };

  return (
    <div>
      {/* Display links to chat history with each user */}
      {Object.entries(groupedMessages).map(([recipientUsername, messages]) => {
        const lastMessage = getLastMessage(messages);
        return (
          <div key={recipientUsername}>
            <Link
              to={`/message/${recipientUsername}`}
              className={styles.chatLink}
            >
              <div className={styles.MainContainer}>
                <img
                  src={lastMessage.recipientPhotoUrl}
                  alt=""
                  className={styles.recipientPhoto}
                />
                <div className={styles.messageContainer}>
                  <p>{recipientUsername.toUpperCase()}</p>
                  <p>Last Message: {lastMessage.content}</p>
                  <p>
                    Date & Time:{" "}
                    {new Date(lastMessage.messageSent).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                        // hour24: true,
                      }
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllMessage;

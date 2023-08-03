import React, { useState, useEffect, useContext } from "react";
import { UserInformationContext } from "../../context/UserTokenProvider";
import { useParams } from "react-router-dom";
import style from "./message.module.css";

const MessageContainer = () => {
  const { token, messages, setMessages } = useContext(UserInformationContext);
  const { recipientUsername } = useParams();

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Function to fetch messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://techmeetappwebapi.onrender.com/api/Message/thread/${recipientUsername}`,
          {
            method: "PUT", // Use the PUT method for fetching messages
            headers: {
              Authorization: `Bearer ${token}`, // Use the token from the context for authorization
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(); // Call the fetchMessages function
  }, [recipientUsername, token]); // Include the token and userId in the dependencies to re-fetch messages when they change

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      // Check if the message is empty or contains only whitespace characters
      console.error("Error sending message: Message cannot be empty");
      return;
    }
    try {
      const response = await fetch(
        "https://techmeetappwebapi.onrender.com/api/Message/send",
        {
          method: "POST", // Use the POST method for sending messages
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the token from the context for authorization
          },
          body: JSON.stringify({
            recipientUsername: recipientUsername.toUpperCase(), // Use userId as the recipientUsername
            content: newMessage,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessages([...messages, data]); // Assuming the response data is the newly sent message
      setNewMessage(""); // Clear the message input after sending
    } catch (error) {
      // Handle error if the message couldn't be sent
      console.error("Error sending message:", error);
    }
  };

  // Function to format the time
  const formatTime = (time) => {
    const date = new Date(time);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

   // Sort messages by messageSent timestamp
   const sortedMessages = messages.sort((a, b) => {
    return new Date(a.messageSent) - new Date(b.messageSent);
  });

  return (
    <div>
      <h2>Messages with {recipientUsername}</h2>
      <div className={style.imageContainer}>
        <img
          src={messages.recipientPhotoUrl}
          alt=""
          className={style.recipientPhoto}
        />
      </div>
      <div className={style.mainContainer}>
        <div>
          {/* Display existing messages */}
         {sortedMessages.map((message, index) => (
            <div key={index}>
              <div className={style.messageContainer}>
                <p>{message.content}</p>
                <p>Sent at: {formatTime(message.messageSent)}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          {/* Form to send a new message */}
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

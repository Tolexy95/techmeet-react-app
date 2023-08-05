import React, { useState, useEffect, useContext } from "react";
import { UserInformationContext } from "../../context/UserTokenProvider";
import { useParams } from "react-router-dom";
import style from "./message.module.css";

const MessageContainer = () => {
  const {
    token,
    messages,
    setMessages,
    userName: currentUserUsername,
  } = useContext(UserInformationContext);
  const { recipientUsername } = useParams();

  // console.log(currentUserUsername)

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
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
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
      
      const data = await response.json();
      setMessages([...messages, data]); // Assuming the response data is the newly sent message
      setNewMessage(""); // Clear the message input after sending
    } catch (error) {
      // Handle error if the message couldn't be sent
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[date.getDay()];
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const dayOfMonth = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().substr(-2);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${day}, ${month}/${dayOfMonth}/${year}, ${formattedHours}:${formattedMinutes} ${amOrPm}`;
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
        <div className={style.majorContainer}>
          {/* Display existing messages */}
          {sortedMessages.map((message, index) => (
            <div >
              <div
                key={index}
                className={`${style.messageContainer} ${
                  message.senderUsername === currentUserUsername
                    ? style.sentMessageContainer
                    : style.receivedMessageContainer
                }`}
              >
                <div>
                  <p>{message.content}</p>
                  {/* Conditionally display "Sent at" or "Received at" */}
                  <p>
                    {message.senderUsername === currentUserUsername
                      ? `Sent at: ${formatTime(message.messageSent)}`
                      : `Received at: ${formatTime(message.messageSent)}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {/* Form to send a new message */}
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

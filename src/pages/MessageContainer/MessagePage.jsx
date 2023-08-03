import React, { useState, useEffect, useContext } from "react";
import { UserInformationContext } from "../../context/UserTokenProvider";

const MessageContainer = ({match}) => {
  const { userData, userName, token } = useContext(UserInformationContext); // Get the userData from the context
  const { userName: currentUserName } = userData || {}; // Assuming the token is stored in the userData

  // const { userName } = match.params; // Get the user name from the URL params

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Function to fetch messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://techmeetappwebapi.onrender.com/api/Message/thread/${currentUserName}`, {
          method: "PUT", // Use the PUT method for fetching messages
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from the context for authorization
          },
        });
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
  }, [userName, token]); // Include the token in the dependencies to re-fetch messages when the token changes

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    try {
      const response = await fetch("https://techmeetappwebapi.onrender.com/api/Message/send", {
        method: "POST", // Use the POST method for sending messages
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token from the context for authorization
        },
        body: JSON.stringify({
          recipientUsername: userName,
          content: newMessage,
        }),
      });
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

  return (
    <div>
      <h2>Messages with User {currentUserName}</h2>
      <div>
        {/* Display existing messages */}
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.content}</p>
            <p>Sent at: {message.sentAt}</p>
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
  );
};

export default MessageContainer;

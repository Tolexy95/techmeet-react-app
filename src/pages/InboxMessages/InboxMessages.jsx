import React, { useState, useEffect, useContext } from 'react';
import { UserInformationContext } from '../../context/UserTokenProvider';
import style from "./inboxmessage.module.css"
import { Link } from 'react-router-dom';


const InboxMessages = () => {
  const { token } = useContext(UserInformationContext);
  const [inboxMessages, setInboxMessages] = useState([]);

  useEffect(() => {
    // Function to fetch inbox messages for the logged-in user
    const fetchInboxMessages = async () => {
      try {
        const response = await fetch(
          'https://techmeetappwebapi.onrender.com/api/Message?Container=inbox',
          {
            method: 'PUT', // Use the GET method to fetch inbox messages
            headers: {
              Authorization: `Bearer ${token}`, // Use the token from the context for authorization
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInboxMessages(data);
      } catch (error) {
        console.error('Error fetching inbox messages:', error);
      }
    };

    fetchInboxMessages(); // Call the fetchInboxMessages function
  }, [token]); // Include the token in the dependencies to re-fetch inbox messages when it changes

  

  // Function to group messages by sender
  const groupMessagesBySender = (messages) => {
    const groupedMessages = {};
    messages.forEach((message) => {
      const sender = message.senderUsername;
      if (!groupedMessages[sender]) {
        groupedMessages[sender] = [];
      }
      groupedMessages[sender].push(message);
    });

// Sort messages for each recipient by messageSent timestamp in descending order
Object.values(groupedMessages).forEach((messages) => {
    messages.sort((a, b) => new Date(b.messageSent) - new Date(a.messageSent));
  });

    return groupedMessages;
  };

// Group messages by sender
  const groupedMessages = groupMessagesBySender(inboxMessages);

//   // Function to get the last message from the conversation
//   const getLastMessage = (messages) => {
//     return messages[messages.length - 1];
//   };

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


return (
    <div>
      <h2>Inbox Messages</h2>
      <div className={style.mainContainer}>
        {Object.keys(groupedMessages).map((sender, index) => (
          <div key={index}>
            <h3>Conversation with {sender}</h3>
            {/* Display messages for the conversation */}
            {groupedMessages[sender].map((message, messageIndex) => (
              <div key={messageIndex}>
                <div className={style.messageContainerReceived}>
                  <p>{message.content}</p>
                  <p>Sent at: {formatTime(message.messageSent)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

  
export default InboxMessages;



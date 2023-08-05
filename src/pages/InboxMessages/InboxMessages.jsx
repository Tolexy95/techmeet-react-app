import React, { useState, useEffect, useContext } from 'react';
import { UserInformationContext } from '../../context/UserTokenProvider';
import styles from "./inboxmessage.module.css"
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

  // Function to get the last message from the conversation
  const getLastMessage = (messages) => {
    return messages[messages.length - 1];
  };



  return (
    <div>
      {/* Display links to chat history with each user */}
      {Object.entries(groupedMessages).map(([senderUsername, messages]) => {
        const lastMessage = getLastMessage(messages);
        return (
          <div key={senderUsername}>
            <Link
              to={`/message}`}
              className={styles.chatLink}
            >
              <div className={styles.MainContainer}> 
                <img
                  src={lastMessage.senderPhotoUrl}
                  alt=""
                  className={styles.recipientPhoto}
                />
                <div className={styles.messageContainer}>
                  <p>{senderUsername.toUpperCase()}</p>
                  <p>Last Message: {lastMessage.content}</p>
                  <p>
                    Date & Time:{" "}
                    {new Date(lastMessage.messageSent).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
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

export default InboxMessages;



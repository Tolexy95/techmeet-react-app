import React, { useState, useEffect, useContext } from "react";
import { UserInformationContext } from "../../context/UserTokenProvider";
import { Link } from "react-router-dom";
import styles from "./AllMessage.module.css";

const AllMessage = () => {
  const { token } = useContext(UserInformationContext);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [outboxMessages, setOutboxMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const inboxResponse = await fetch(
          "https://techmeetappwebapi.onrender.com/api/Message?Container=inbox",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const outboxResponse = await fetch(
          "https://techmeetappwebapi.onrender.com/api/Message?Container=outbox",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!inboxResponse.ok || !outboxResponse.ok) {
          throw new Error("Failed to fetch messages");
        }

        const inboxData = await inboxResponse.json();
        const outboxData = await outboxResponse.json();

        setInboxMessages(inboxData);
        setOutboxMessages(outboxData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [token]);

  // Function to group messages by sender and recipient usernames
  const groupMessagesByUsernames = (messages) => {
    const groupedMessages = {};
    messages.forEach((message) => {
      const senderUsername = message.senderUsername.toLowerCase();
      const recipientUsername = message.recipientUsername.toLowerCase();

      // Add the message to the sender's group
      if (!groupedMessages[senderUsername]) {
        groupedMessages[senderUsername] = [];
      }
      groupedMessages[senderUsername].push(message);

      // Add the message to the recipient's group
      if (!groupedMessages[recipientUsername]) {
        groupedMessages[recipientUsername] = [];
      }
      groupedMessages[recipientUsername].push(message);
    });

    // Sort messages for each sender/recipient by messageSent timestamp in descending order
    Object.values(groupedMessages).forEach((messages) => {
      messages.sort((a, b) => new Date(b.messageSent) - new Date(a.messageSent));
    });

    return groupedMessages;
  };

  // Group messages by both sender and recipient usernames for both inbox and outbox
  const groupedInboxMessages = groupMessagesByUsernames(inboxMessages);
  const groupedOutboxMessages = groupMessagesByUsernames(outboxMessages);

  // Function to get the last message from the conversation
  const getLastMessage = (messages) => {
    return messages[messages.length - 1];
  };

  return (
    <div>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <>
          <h2>Inbox Messages:</h2>
          {Object.entries(groupedInboxMessages).map(([senderUsername, messages]) => {
            const lastMessage = getLastMessage(messages);
            return (
              <div key={senderUsername}>
                <Link
                  to={`/message/${senderUsername}`}
                  className={styles.chatLink}
                >
                  <div className={styles.MainContainer}>
                    <img
                      src={lastMessage.senderPhotoUrl} // Displaying the sender's photo
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

          <h2>Outbox Messages:</h2>
          {Object.entries(groupedOutboxMessages).map(([recipientUsername, messages]) => {
            const lastMessage = getLastMessage(messages);
            return (
              <div key={recipientUsername}>
                <Link
                  to={`/message/${recipientUsername}`}
                  className={styles.chatLink}
                >
                  <div className={styles.MainContainer}>
                    <img
                      src={lastMessage.recipientPhotoUrl} // Displaying the recipient's photo
                      alt=""
                      className={styles.recipientPhoto}
                    />
                    <div className={styles.messageContainer}>
                      <p>{recipientUsername.toUpperCase()}</p>
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
        </>
      )}
    </div>
  );
};

export default AllMessage;

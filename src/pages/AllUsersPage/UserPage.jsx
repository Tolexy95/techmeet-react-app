import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./userpage.module.css";
import { UserInformationContext } from "../../context/UserTokenProvider";
import { useParams } from "react-router-dom";


const UserPage = () => {
  const [users, setUsers] = useState([]);
  const { token, userData, messages, setMessages } = useContext(UserInformationContext);
  // const { recipientUsername } = messages;
  const { recipientUsername } = useParams();
 
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "https://techmeetappwebapi.onrender.com/api/Users",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the token from the context for authorization
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getUsers();
  }, [token]);
  
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


  return (
    <div>
      <aside className={styles.aside}>
        <section className={styles.membership} id="userSection">
          {users.map((user) => (
            <div key={user.userName} className={styles.memberContainer}>
              <img
                src={user.photoUrl}
                alt="User Image"
                className={styles.otherUserImage}
              />
              <p className={styles.otherUserName}>{user.userName}</p>
              <p className={styles.otherUserEmail}>{user.email}</p>
              <p className={styles.lastActive}>
                Last Active:{" "}
                {new Date(user.lastActive).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
              <Link
                to={`/othersProfile/${userData.userName}`}
                className={styles.otherUserProfile}
              >
                Go to user profile
              </Link>
              <Link
                to={`/message/${messages.recipientUsername}`}
                className={styles.chatWithUser}
              >
                Chat with user
              </Link>
            </div>
          ))}
        </section>
      </aside>
    </div>
  );
};

export default UserPage;


// import React, { useState, useEffect, useContext } from "react";
// import { UserInformationContext } from "../../context/UserTokenProvider";
// import { useParams } from "react-router-dom";
// import style from "./message.module.css";

// const MessageContainer = () => {
//   const { token, messages, setMessages, userData } = useContext(
//     UserInformationContext
//   );
//   const { recipientUsername } = useParams();
//   const [newMessage, setNewMessage] = useState("");
//   const [inboxMessages, setInboxMessages] = useState([]);

//   const { username: currentUserUsername } = userData || {};

//   useEffect(() => {
//     // Function to fetch messages from the backend
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(
//           `https://techmeetappwebapi.onrender.com/api/Message/thread/${recipientUsername}`,
//           {
//             method: "PUT", // Use the PUT method for fetching messages
//             headers: {
//               Authorization: `Bearer ${token}`, // Use the token from the context for authorization
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages(); // Call the fetchMessages function
//   }, [recipientUsername, token]); // Include the token and userId in the dependencies to re-fetch messages when they change

//   // Function to handle sending a new message
//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "") {
//       // Check if the message is empty or contains only whitespace characters
//       console.error("Error sending message: Message cannot be empty");
//       return;
//     }
//     try {
//       const response = await fetch(
//         "https://techmeetappwebapi.onrender.com/api/Message/send",
//         {
//           method: "POST", // Use the POST method for sending messages
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Use the token from the context for authorization
//           },
//           body: JSON.stringify({
//             recipientUsername: recipientUsername.toUpperCase(), // Use userId as the recipientUsername
//             content: newMessage,
//           }),
//         }
//       );
//       console.log(recipientUsername);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setMessages([...messages, data]); // Assuming the response data is the newly sent message
//       setNewMessage(""); // Clear the message input after sending
//     } catch (error) {
//       // Handle error if the message couldn't be sent
//       console.error("Error sending message:", error);
//     }
//   };

//   useEffect(() => {
//     // Function to fetch inbox messages for the logged-in user
//     const fetchInboxMessages = async () => {
//       try {
//         const response = await fetch(
//           "https://techmeetappwebapi.onrender.com/api/Message?Container=inbox",
//           {
//             method: "PUT", // Use the GET method to fetch inbox messages
//             headers: {
//               Authorization: `Bearer ${token}`, // Use the token from the context for authorization
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setInboxMessages(data);
//       } catch (error) {
//         console.error("Error fetching inbox messages:", error);
//       }
//     };

//     fetchInboxMessages(); // Call the fetchInboxMessages function
//   }, [token]); // Include the token in the dependencies to re-fetch inbox messages when it changes

//   // Function to format the time
//   const formatTime = (time) => {
//     const date = new Date(time);
//     return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
//   };

//   // Function to get conversation messages for the current recipient
//   const getConversationMessages = () => {
//     // Filter inboxMessages to get only the conversation with the recipient
//     const conversationMessages = inboxMessages.filter(
//       (message) =>
//         (message.senderUsername === currentUserUsername &&
//           message.recipientUsername === recipientUsername.toUpperCase()) ||
//         (message.senderUsername === recipientUsername.toUpperCase() &&
//           message.recipientUsername === currentUserUsername)
//     );

//     // Sort messages by messageSent timestamp
//     return conversationMessages.sort((a, b) => {
//       return new Date(a.messageSent) - new Date(b.messageSent);
//     });
//   };

//   // Get the conversation messages for the current recipient
//   const conversationMessages = getConversationMessages();

//   return (
//     <div>
//       <h2>Messages with {recipientUsername}</h2>
//       <div className={style.imageContainer}>
//         <img
//           src={messages.recipientPhotoUrl}
//           alt=""
//           className={style.recipientPhoto}
//         />
//       </div>
//       <div className={style.mainContainer}>
//         <div>
//           {/* Display existing messages */}
//           {conversationMessages.map((message, index) => (
//             <div key={index}>
//               <div
//                 className={
//                   message.senderUsername === currentUserUsername
//                     ? style.messageContainerSent
//                     : style.messageContainerReceived
//                 }
//               >
//                 <p>{message.content}</p>
//                 <p>Sent at: {formatTime(message.messageSent)}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div>
//           {/* Form to send a new message */}
//           <textarea
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message..."
//           />
//           <button onClick={handleSendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageContainer;


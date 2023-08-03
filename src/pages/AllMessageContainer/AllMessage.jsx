import React, { useState, useEffect, useContext } from 'react';
import { UserInformationContext } from '../../context/UserTokenProvider';
import styles from './AllMessage.module.css'; // Import the CSS module

const AllMessage = () => {
  const { userData, token, messages, setMessages } = useContext(UserInformationContext); // Get the userData from the context
  const { userName: currentUserName } = userData || {};
 
  const {
    senderPhotoUrl,
    senderUsername,
    recipientPhotoUrl,
    recipientUsername,
    content,
    dateRead,
    messageSent,
  } = messages || {};

  useEffect(() => {
    // Function to fetch all messages from the backend
    const fetchAllMessages = async () => {
      try {
        const response = await fetch('https://techmeetappwebapi.onrender.com/api/Message?Container=outbox', {
          method: 'PUT', // Use the PUT method for fetching all messages
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from the context for authorization
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching all messages:', error);
      }
    };

    fetchAllMessages(); // Call the fetchAllMessages function
  }, [token]); // Include the token in the dependencies to re-fetch messages when the token changes
 console.log(currentUserName)
  return (
    <div>
         {/* <h1>chat with {currentUserName}</h1> */}
      <img src={senderPhotoUrl} alt="" />
      <p>{senderUsername}</p>
      <img src={recipientPhotoUrl} alt=""/>
      <p>{recipientUsername}</p>
      <p>{content}</p>
      <p>{dateRead}</p>
      <p>{messageSent}</p>
    </div>
//     <aside className="aside">
//     <div className="col-md-6 col-xl-4 grid-margin stretch-card">
//       <div className="card">
//         <div className="card-body">
//           <div className="d-flex flex-row justify-content-between">
//             <h4 className="card-title">Messages</h4>
//             <p className="text-muted mb-1 small">View all</p>
//           </div>
//           <div className="preview-list">
//             {messages.map((message, index) => (
//               <div key={index} className="preview-item border-bottom">
//                 <div className="preview-thumbnail">
//                   <img src={message.imageSrc} alt="image" className="rounded-circle" />
//                 </div>
//                 <div className="preview-item-content d-flex flex-grow">
//                   <div className="flex-grow">
//                     <div className="d-flex d-md-block d-xl-flex justify-content-between">
//                       <h6 className="preview-subject">{currentUserName}</h6>
//                       <p className="text-muted text-small">{message.sentTime}</p>
//                     </div>
//                     <p className="text-muted">{message.content}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   </aside>
  );
};

export default AllMessage;

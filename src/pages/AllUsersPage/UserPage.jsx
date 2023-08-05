import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./userpage.module.css";
import { UserInformationContext } from "../../context/UserTokenProvider";



const UserPage = () => {
  const [users, setUsers] = useState([]);
  const { token, userData, messages, setMessages } = useContext(UserInformationContext);
  // const { recipientUsername } = messages;
 

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
                to={"/othersProfile/:UserId"}
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



import React, { useContext } from "react";
import AppLogo from "../../assets/img/AppLogo-removebg-preview.png";
import styles from "./otherUser.module.css";
import { UserInformationContext } from "../../context/UserTokenProvider";
import { Link } from "react-router-dom";

const OtherUserProfile = () => {
  const { userData } = useContext(UserInformationContext); // Get the userData from the context

  const {
    userName,
    photoUrl,
    dateOfBirth,
    fullName,
    created,
    lastActive,
    gender,
    about,
    lookingFor,
    interests,
    city,
    country,
  } = userData || {};

  // Function to format the date of birth as "YYYY-MM-DD"
  const formatDateOfBirth = (dob) => {
    const dateObj = new Date(dob);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <img
          src={photoUrl || "default-profile-picture.png"}
          alt="Profile Picture"
          className={styles.profilePicture}/>

        <h1 className={styles.profileName}>{fullName}</h1>
        <p className={styles.profileUsername}>@{userName}</p>
      </div>

      <div className={styles.profileDetails}>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Date of Birth:</strong> {dateOfBirth ? formatDateOfBirth(dateOfBirth) : "N/A"}
        </p>
        <p>
          <strong>About:</strong> {about || "N/A"}
        </p>
        <p>
          <strong>Looking for:</strong> {lookingFor || "N/A"}
        </p>
        <p>
          <strong>Interests:</strong> {interests || "N/A"}
        </p>
        <p>
          <strong>City:</strong> {city}
        </p>
        <p>
          <strong>Country:</strong> {country}
        </p>
        <p>
          <strong>Member since:</strong> {created}
        </p>
        {/* <p>
          <strong>Last Active:</strong> {lastActive}
        </p> */}
      </div>
      <div className={styles.message}>
        <Link to="/message/:userId"> chat with user</Link>
      </div>
    </div>
  );
};

export default OtherUserProfile;

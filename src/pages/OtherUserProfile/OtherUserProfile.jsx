import React, { useState, useEffect, useContext } from "react";
import AppLogo from "../../assets/img/AppLogo-removebg-preview.png";
import styles from "./otherUser.module.css";
import { UserInformationContext } from "../../context/UserTokenProvider";
import { Link } from "react-router-dom";

const OtherUserProfile = () => {
  const { clickedUser } = useContext(UserInformationContext);

  // Check if clickedUser exists and has data
  if (!clickedUser || Object.keys(clickedUser).length === 0) {
    return <div>{clickedUser}</div>;
  }

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
    photos,
  } = clickedUser;

  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <img
          src={photoUrl || "default-profile-picture.png"} // Use a default image if the user doesn't have a photoUrl
          alt="Profile Picture"
          className={styles.profilePicture}
        />
        <h1 className={styles.profileName}>{fullName}</h1>
        <p className={styles.profileUsername}>@{userName}</p>
      </div>

      <div className={styles.profileDetails}>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Date of Birth:</strong> {dateOfBirth}
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
        <p>
          <strong>Last Active:</strong> {lastActive}
        </p>
      </div>
    </div>
  );
};

export default OtherUserProfile;

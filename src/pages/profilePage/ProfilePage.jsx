import React, { useState, useEffect, useContext } from "react";
import AppLogo from "../../assets/img/AppLogo-removebg-preview.png";
import styles from "./profile.module.css";
import { UserInformationContext } from "../../context/UserTokenProvider";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [profile, setProfile] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    address: "",
    stack: "",
    yearsOfExperience: "",
    social: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
    },
    bio: "",
  });

  const { clickedUser } = useContext(UserInformationContext);

  // Function to handle file input change and update the profile picture preview
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle input change and update profile data
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
    saveProfile();
  };

  // Function to save the profile information to local storage
  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    if (isProfileUpdated()) {
      alert("Profile has been successfully updated.");
    } else {
      alert("Please make some changes before updating the profile.");
    }
  };

  // Function to check if any changes have been made to the profile
  const isProfileUpdated = () => {
    const {
      firstName,
      lastName,
      phone,
      gender,
      email,
      address,
      stack,
      yearsOfExperience,
      facebook,
      linkedin,
      twitter,
      instagram,
      bio,
    } = profile;
    return (
      firstName !== "" ||
      lastName !== "" ||
      phone !== "" ||
      gender !== "" ||
      email !== "" ||
      address !== "" ||
      stack !== "" ||
      yearsOfExperience !== "" ||
      facebook !== "" ||
      linkedin !== "" ||
      twitter !== "" ||
      instagram !== "" ||
      bio !== ""
    );
  };

  // Function to load the profile information from local storage on page load
  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.flexClass}>
        <button className={styles.goHome}>
          <Link to="/mainPage">Go back</Link>
        </button>
        <img src={AppLogo} alt="" className={styles.logo} />
      </div>

      <section className={`${styles.container} ${styles.messageContainer}`}>
        <div className={styles.profile}>
          <div className={styles["profile-picture"]}>
            <label htmlFor="profile-picture">upload picture</label>

            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              className={styles["profile-picture-input"]}
              onChange={handleFileInputChange}
            />
            <img
              src={profilePicturePreview}
              alt=""
              className={styles["profile-picture-preview"]}
              id="profile-picture-preview"
            />
          </div>

          <div className={styles["profile-info"]}>
            <div className={styles.nameDiv}>
              <div>
                <label htmlFor="first-name">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  className={styles["name-input"]}
                  placeholder="Enter your firstname"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="last-name">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  className={styles["name-input"]}
                  placeholder="Enter your Lastname"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.genderDiv}>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="number"
                  id="phoneNumber"
                  className={styles["phone-input"]}
                  placeholder="phone number"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  id="gender"
                  className={styles["gender-input"]}
                  value={profile.gender}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className={styles["email-input"]}
              placeholder="Enter your Email"
              value={profile.email}
              onChange={handleInputChange}
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              className={styles["address-input"]}
              placeholder="Enter your address"
              value={profile.address}
              onChange={handleInputChange}
            />

            <label htmlFor="stack">Stack Level:</label>
            <select
              id="stack"
              className={styles["stack-input"]}
              value={profile.stack}
              onChange={handleInputChange}
            >
              <option value="">pick your track</option>
              <option value="react">React</option>
              <option value="java">Java</option>
              <option value=".Net">.Net</option>
              <option value="angular">Angular</option>
              <option value="python">Python</option>
              <option value="others">Others</option>
            </select>

            <label htmlFor="yearsOfExperience">Years of Experience:</label>
            <input
              type="number"
              id="yearsOfExperience"
              className={styles["exper-input"]}
              placeholder="0"
              value={profile.yearsOfExperience}
              onChange={handleInputChange}
            />

            <label>Share your talents through social media handles:</label>
            <div className={styles["social-input"]}>
              <div>
                <label htmlFor="facebook">Facebook:</label>
                <input
                  type="text"
                  id="facebook"
                  className={styles.social}
                  placeholder="Facebook handle"
                  value={profile.social.facebook}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="linkedin">LinkedIn:</label>
                <input
                  type="text"
                  id="linkedin"
                  className={styles.social}
                  placeholder="LinkedIn handle"
                  value={profile.social.linkedin}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="twitter">Twitter:</label>
                <input
                  type="text"
                  id="twitter"
                  className={styles.social}
                  placeholder="Twitter handle"
                  value={profile.social.twitter}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="instagram">Instagram:</label>
                <input
                  type="text"
                  id="instagram"
                  className={styles.social}
                  placeholder="Instagram handle"
                  value={profile.social.instagram}
                  onChange={handleInputChange}
                />
              </div>
              {/* Add more social media input fields as needed */}
            </div>

            <label htmlFor="bio">About Me:</label>
            <textarea
              id="bio"
              className={styles["bio-input"]}
              placeholder="Write a short bio about yourself"
              value={profile.bio}
              onChange={handleInputChange}
            ></textarea>

            <a className={styles["update-btn"]} onClick={saveProfile}>
              <span>update profile</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;

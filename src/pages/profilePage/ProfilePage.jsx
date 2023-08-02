import React, { useState, useEffect } from "react";
import AppLogo from "../../assets/img/AppLogo-removebg-preview.png";
import styles from "./profile.module.css";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [profilePicturePreview, setProfilePicturePreview] = useState(AppLogo);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    address: "",
    dateOfBirth: "",
    interests: "",
    state: "",
    country: "",
    stack: "",
    yearsOfExperience: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    bio: "",
    profilePicture: null,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData({ ...profileData, [id]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({ ...profileData, profilePicture: reader.result });
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileData({ ...profileData, profilePicture: null });
      setProfilePicturePreview(AppLogo);
    }
  };



  const saveProfile = () => {
    // Exclude the profilePicture from the saved data in localStorage
    const { profilePicture, ...profileDataWithoutPicture } = profileData;
    localStorage.setItem("profile", JSON.stringify(profileDataWithoutPicture));
    alert("Profile has been successfully updated.");
  };


  const loadProfile = () => {
    if (localStorage.getItem("profile")) {
      const profile = JSON.parse(localStorage.getItem("profile"));
      setProfileData(profile);

      if (profile.profilePicture && profile.profilePicture instanceof Blob) {
        setProfilePicturePreview(URL.createObjectURL(profile.profilePicture));
      } else {
        setProfilePicturePreview(AppLogo);
      }
    }
  };

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
            <label htmlFor="profile-picture">Upload Picture</label>
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
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  className={styles["name-input"]}
                  placeholder="Enter your firstname"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  className={styles["name-input"]}
                  placeholder="Enter your Lastname"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.genderDiv}>
              <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="number"
                  id="phoneNumber"
                  className={styles["phone-input"]}
                  placeholder="Phone number"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  id="gender"
                  className={styles["gender-input"]}
                  value={profileData.gender}
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
              value={profileData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              className={styles["address-input"]}
              placeholder="Enter your address"
              value={profileData.address}
              onChange={handleInputChange}
            />
            <div className={styles.genderDiv}>
              <div>
                <label htmlFor="dateOfBirth">DOB:</label>
                <input
                  type="number"
                  id="dateOfBirth"
                  className={styles["phone-input"]}
                  placeholder="DOB"
                  value={profileData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="interests">Interests:</label>
                <input
                  type="text"
                  id="interests"
                  placeholder="What are your interests?"
                  className={styles["gender-input"]}
                  value={profileData.interests}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.genderDiv}>
              <div>
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  placeholder="Your state"
                  className={styles["gender-input"]}
                  value={profileData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  className={styles["phone-input"]}
                  placeholder="Your country"
                  value={profileData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <label htmlFor="stack">Stack Level:</label>
            <select
              id="stack"
              className={styles["stack-input"]}
              value={profileData.stack}
              onChange={handleInputChange}
            >
              <option value="">Pick your track</option>
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
              value={profileData.yearsOfExperience}
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
                  value={profileData.facebook}
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
                  value={profileData.linkedin}
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
                  value={profileData.twitter}
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
                  value={profileData.instagram}
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
              value={profileData.bio}
              onChange={handleInputChange}
            ></textarea>

            <a className={styles["update-btn"]} onClick={saveProfile}>
              <span>Update Profile</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;

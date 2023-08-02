import React, { useState, useEffect, useContext } from "react";
import AppLogo from "../../assets/img/AppLogo-removebg-preview.png";
import style from "./mainPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserInformationContext } from "../../context/UserTokenProvider";


const MainPage = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const { userName, token, userData, setUserData } = useContext(UserInformationContext);
  const navigate = useNavigate();

  const findUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://techmeetappwebapi.onrender.com/api/Users/${userInput}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token as an authentication header
          },
        }
      );

      if (!response.ok) {
        throw new Error("User not found or unauthorized access");
      }

      const userData = await response.json();
      setUserData(userData); // Save the fetched user data in the state
       // Use the navigate function to navigate to the user profile page
       navigate(`/othersProfile/${userData.userName}`);
      } catch (error) {
        console.error("Error:", error.message);
        setIsLoading(false);
        alert("User does not exist");
        // Handle the error here, e.g., show an error message to the user
      }
    };
  
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        findUsers();
        setUserInput("")
      }
     
    };


  const toggleSidebar = () => {
    setSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };

  return (
    <div>
      <nav className={`${style.sidebar} ${isDarkMode ? style.close : ""}`}>
        <header>
          <div className={style["image-text"]}>
            <i className="bx bx-chevron-right toggle"></i>
          </div>
        </header>

        <div className={style["menu-bar"]}>
          <div className={style.menu}>
            <li className={style["search-box"]}>
              <i className="bx bx-search icon"></i>
              <input
                type="text"
                placeholder="Search..."
                value={userInput}
                onInput={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress} // Use handleKeyPress function for onKeyDown event
              />
            </li>

            <ul className={style["menu-links"]}>
              <li className={style["nav-link"]}>
                <i className="bx bx-home-alt icon"></i>
                <Link to="/profilePage" className={`text ${style["nav-text"]}`}>
                  Profile
                </Link>
              </li>

              <li className={style["nav-link"]}>
                <i className="bx bx-bar-chart-alt-2 icon"></i>
                <Link to="/userPage" className={`text ${style["nav-text"]}`}>
                  Members
                </Link>
              </li>

              <li className={style["nav-link"]}>
                <a href="#">
                  <i className="bx bx-heart icon"></i>
                  <span className={`text ${style["nav-text"]}`}>Likes</span>
                </a>
              </li>

              <li className={style["nav-link"]}>
                <i className="bx bx-wallet icon"></i>
                <Link to="/messagePage" className={`text ${style["nav-text"]}`}>
                  Messages
                </Link>
              </li>
            </ul>
          </div>

          <div className={style["bottom-content"]}>
            <li className="">
              <i className="bx bx-log-out icon"></i>
              <Link to="/" className={`text ${style["nav-text"]}`}>
                Logout
              </Link>
            </li>

            <li className={style["mode"]}>
              <div className={style["sun-moon"]}>
                <i className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"} icon`} />
              </div>
              <span className={`mode-text text`}>Dark mode</span>

              <div className={style["toggle-switch"]}>
                <span
                  className={style["switch"]}
                  onClick={toggleDarkMode}
                ></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      <section className={style.home}>
        <div className={style.text}>
          <p id="userCredentials">Welcome {userName.toUpperCase()}</p>
        </div>
        <span className={style.image}>
          <img src={AppLogo} alt="" className={style.pageLogo} />
        </span>

        {isLoading && <p className={style.successMessage}>Fetching...</p>}
       
      </section>
    </div>
  );
};

export default MainPage;

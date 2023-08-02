import React from "react";
import styles from "./SignInPage.module.css";
import emailIcon from "../../assets/img/icons8-email-48.png";
import passwordIcon from "../../assets/img/icons8-password-24.png";
import eyeIcon from "../../assets/img/eye-password-hide-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserInformationContext } from "../../context/UserTokenProvider";

const SignInPage = () => {
  // const [isLoggedIn, setLoggedIn] = useState(false); // State to track login status
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { token, userName, setToken, setUserName,test } = useContext(
    UserInformationContext
  );
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/mainPage");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
     try {
      const {token, userName } = await authenticateUser(formData);
      // console.log(userName)
      if (token && userName) {
        setLoading(false);
        // setLoggedIn(true); // Set the login status to true
        setToken(token); // Set the token in context
        setUserName(userName); // Set the userName in context
        handleNavigation();
      } else {
        setLoading(false);
        alert("Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      alert("You need to SignUp first: " + error.message);
    }
  };

  const authenticateUser = async (formData) => {
    try {
      const response = await fetch(
        "https://techmeetappwebapi.onrender.com/api/Account/login",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to authenticate user";

        if (response.status === 404) {
          errorMessage = "API endpoint not found";
        } else if (response.status === 401) {
          errorMessage = "Unauthorized access";
        } else if (response.status === 500) {
          errorMessage = "Internal server error";
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return {
        token: data.token,
        userName: data.userName,
      };
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <section className={styles.formContainer}>
      <p>{test}</p>
      <form action="" id="validationForm" onSubmit={handleSubmit}>
        <div className={styles.signInPage}>
          <h2 className={styles.loginText}>Login</h2>
          <div className={styles.inputSection}>
            <div className={styles.boxInput}>
              <input
                type="email"
                placeholder="Enter your email"
                className={`${styles.box} ${styles.inputBox}`}
                required
                id="emailBox"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <img
                src={emailIcon}
                alt=""
                className={`${styles.iconEmail} ${styles.symbol}`}
              />
            </div>

            <div className={styles.boxInput}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your Password"
                maxLength="13"
                className={`${styles.box} ${styles.inputBox}`}
                required
                id="passwordBox"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <img
                src={passwordIcon}
                alt=""
                className={`${styles.iconPassword} ${styles.symbol}`}
              />
              <img
                src={eyeIcon}
                alt=""
                onClick={togglePasswordVisibility}
                className={`${styles.eyeSlack} ${styles.symbol}`}
              />
            </div>

            <p className={styles.passwordText}>
              The password length must be a minimum of 8 characters
            </p>
          </div>

          <div className={styles.checkBoxPage}>
            <div className={styles.remember}>
              <input type="checkbox" className={styles.boxCheck} />
              <p className={styles.textPara}>Remember me</p>
            </div>

            <p className={styles.textPara}>
              <a href="">Forget password</a>
            </p>
          </div>

          <div>
            <button
              id="submit"
              className={`${styles.classBtn} ${styles.classBtnLogin}`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>

            <p className={`${styles.finalPart} ${styles.signInPara}`}>
              Don't have an account?
              <span>
                <Link to="/signUp" className={styles.signUpLink}>
                  Sign up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </form>
      <p className={styles.messageContainer}></p>
    </section>
  );
};

export default SignInPage;

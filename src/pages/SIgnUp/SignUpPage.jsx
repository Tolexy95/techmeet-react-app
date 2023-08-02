import React, {useState,useEffect } from "react";
import EmailIcon from "../../assets/img/icons8-email-48.png";
import PasswordIcon from "../../assets/img/icons8-password-24.png";
import EyePasswordIcon from "../../assets/img/eye-password-hide-svgrepo-com.svg";
import style from "./signupPage.module.css";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    country: "",
    nin: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

let navigate = useNavigate()
const handleNavigation = () => {
      navigate('/signIn')
   }

 
   const handleSubmit = async (event) => {
    setLoading(true); 
    event.preventDefault();
    const {
      userName,
      fullName,
      gender,
      dateOfBirth,
      city,
      country,
      nin,
      email,
      password,
    } = formData;

    
    try {
      const isSuccess = await signUpUser(formData);
      if (isSuccess) {
        setSuccess(true); // Set the success state to display the message
      } else {
        console.log("Failed to sign up user");
      }
    } catch (error) {
      console.log("Error occurred during sign-up: " + error.message);
    }
    setLoading(false);
  };

  //   try {
  //     const isSuccess = await signUpUser(formData);
  //     if (isSuccess) {
  //       setSuccess(true); // Set the success state to display the message
  //       setTimeout(() => {
  //       handleNavigation();
  //       }, 3000); // Redirect after 3 seconds
  //     } else {
  //       console.log("Failed to sign up user");
  //     }
  //   } catch (error) {
  //     console.log("Error occurred during sign-up: " + error.message);
  //   }
  //   setLoading(false);
  // };

  const signUpUser = async (formData) => {
    try {
        const response = await fetch(
        "https://techmeetappwebapi.onrender.com/api/Account/register",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        }
      );

      let errorMessage;

      if (response.status === 200) {
        // Handle Success Status
        return true;
      } else {
        if (response.status === 404) {
          errorMessage = "API endpoint not found";
        } else if (response.status === 409) {
          errorMessage = "Username or email already exists";
        } else if (response.status === 500) {
          errorMessage = "Internal server error";
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(true);

  //   setTimeout(() => {
  //     setPasswordVisible(false);
  //   }, 2000);
  // };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
      setPasswordVisible((prevState) => !prevState);
    };

    
  // The useEffect for handling password visibility timer
  useEffect(() => {
    let timer;
    if (isPasswordVisible) {
      timer = setTimeout(() => {
        setPasswordVisible(false);
      }, 2000);
    }

    return () => clearTimeout(timer); // Clean up the timer on unmount or when isPasswordVisible changes
  }, [isPasswordVisible]);

  
  // The useEffect for handling redirection to login page on success
  useEffect(() => {
    if (isSuccess) {
      const redirectTimer = setTimeout(() => {
        handleNavigation();
      }, 3000);

      return () => clearTimeout(redirectTimer); // Clean up the timer on unmount or when isSuccess changes
    }
  }, [isSuccess]);

  return (
    
      <section className={style.formContainer}>
       
       {!isSuccess && (
        <form id={style.validateSignUp} onSubmit={handleSubmit}>
        <div className={style.signUpPage}>
          <h2>Sign Up</h2>
          <div className={style.inputSection}>
           
           <div className={style.firstContainer}>
            <div className={style.boxInput}>
              <input
                type="text"
                placeholder="Username"
                className={style.box}
                id={style.usernameBox}
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                />
            </div>
            
            <div className={style.boxInput}>
              <input
                type="text"
                placeholder="FullName"
                className={style.box}
                id={style.fullNameBox}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}/>
            </div>

            </div>

           <div className={style.secondContainer}>
            <div className={style.boxInput}>
              <input
                type="text"
                placeholder="Gender"
                className={style.box}
                id={style.genderBox}
                name="gender"
                value={formData.gender}
                onChange={handleChange}/>
            </div>
            
            <div className={style.boxInput}>
              <input
                type="text"
                placeholder="i.e 1990-01-01"
                className={style.box}
                id={style.DobBox}
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}/>
            </div>
            </div>

            <div className={style.thirdContainer}>
            <div className={style.boxInput}>
              <input
                type="text"
                placeholder="City"
                className={style.box}
                id={style.cityBox}
                name="city"
                value={formData.city}
                onChange={handleChange}/>
            </div>
            
            <div className={style.boxInput}>
              <input
                type="text"
                placeholder="Country"
                className={style.box}
                id={style.CountryBox}
                name="country"
                value={formData.country}
                onChange={handleChange}/>
            </div>
            </div>
           
            <div className={style.boxInput}>
              <input
                type="number"
                placeholder="NIN"
                className={style.box}
                id={style.NinBox}
                name="nin"
                value={formData.nin}
                onChange={handleChange}/>
            </div>
           
            <div className={style.boxInput}>
              <input
                type="email"
                placeholder="Enter your email"
                className={style.box}
                id={style.emailSignUpBox}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required/>
              <img
                src={EmailIcon}
                alt=""
                className={`${style.iconEmail} ${style.symbol}`}/>
            </div>
            
            <div className={`${style.initialPassword} ${style.boxInput}`}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Create password"
                className={style.box}
                required
                id={style.passwordSignUpBox}
                name="password"
                value={formData.password}
                onChange={handleChange}
                maxLength="13"/>
              <img src={PasswordIcon} alt="" className={`${style.iconPassword} ${style.symbol}`}/>
              <img  onClick={togglePasswordVisibility} src={EyePasswordIcon} alt=""
           className={`${style.eyeSlack} ${style.eyeSlackSignUp}  ${style.symbol}`}/>
            </div>
            
            <div className={`${style.confirmPassword} ${style.boxInput}`}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Confirm password"
                className={style.box}
                id={style.confirmPasswordBox}
                name="confirmPassword"
                required
                maxLength="13"/>
              <img
                src={PasswordIcon}
                alt=""
                className={`${style.iconPassword} ${style.symbol}`}/>
              <img
                src={EyePasswordIcon}
                onClick={togglePasswordVisibility}
                alt=""
            className={`${style.eyeSlack} ${style.eyeSlackSignUp}  ${style.symbol}`}/>
            </div>
          <p className={style.passwordpara}>The password length must be a minimum of 8 characters</p>
          </div>
         
          <button
            type="submit"
            className={`${style.classBtn} ${style.signUpBtn}`}
            id={style.signUpBtn}
            disabled={isLoading} >
            {isLoading ? "Loading..." : "Sign Up"}
            </button>
         
          <p className={style.finalPart}>Already have an account?
          <span>  
        <Link to ="/signIn" className={style.loginLink}>Login</Link>
           </span>
          </p>
        </div>
        </form>
       )}

         {isSuccess && (
            <p className={style.successMessage}>
              You are being redirected to the login page...
            </p>
          )} 
        
      </section>
    
  );
};

export default SignUpPage;

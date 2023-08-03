import React, { createContext, useState, useEffect } from 'react';

export const UserInformationContext = createContext();

const UserTokenProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [clickedUser, setClickedUser] = useState({});
  const [userData, setUserData] = useState({
    userName:'',
    photoUrl :'',
    dateOfBirth:'',
    fullName:'',
    created:'',
    lastActive:'',
    gender:'',
    about:'',
    lookingFor:'',
    interests:'',
    city:'',
    country:'',
  });

  useEffect(() => {
    // On initial load, try to fetch the token and userName from session storage
    const storedToken = sessionStorage.getItem('userToken');
    const storedUserName = sessionStorage.getItem('userName');

    if (storedToken && storedUserName) {
      setToken(storedToken);
      setUserName(storedUserName);
    }
  }, []);

  // Set the token and userName in session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem('userToken', token);
    sessionStorage.setItem('userName', userName);
  }, [token, userName]);

  
  // const fetchUser = async (userName, token) => {
  //    try {
  //     const response = await fetch(
  //       `https://techmeetappwebapi.onrender.com/api/Users/${userName}`, 
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`, // Include the token as an authentication header
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("User not found or unauthorized access");   
  //     }

  //   const userData = await response.json();
  //   setClickedUser(userData);
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     alert("user does not exist")
  //     // Handle the error here, e.g., show an error message to the user
  //   }
  // };
 
  const contextValues = {
    token,
    userName,
    setToken,
    setUserName,
    clickedUser,
    setClickedUser,
    userData,
    setUserData,

    // fetchUser, // Add the fetchUser function to the context values
  };

  return (
    <div>
      <UserInformationContext.Provider value={contextValues}>
        {children}
      </UserInformationContext.Provider>
    </div>
  );
};

export default UserTokenProvider;

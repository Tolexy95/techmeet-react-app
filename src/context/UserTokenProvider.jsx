import React, { createContext, useState, useEffect } from 'react';

export const UserInformationContext = createContext();

const UserTokenProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [clickedUser, setClickedUser] = useState({});
  const [userData, setUserData] = useState({
    // Default values for userData
    // userName: '',
    // photoUrl: '',
    // dateOfBirth: '',
    // fullName: '',
    // created: '',
    // lastActive: '',
    // gender: '',
    // about: '',
    // lookingFor: '',
    // interests: '',
    // city: '',
    // country: '',
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // On initial load, try to fetch the token, userName, and userData from session storage
    const storedToken = sessionStorage.getItem('userToken');
    const storedUserName = sessionStorage.getItem('userName');
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

    if (storedToken && storedUserName) {
      setToken(storedToken);
      setUserName(storedUserName);
    }

    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  // Set the token, userName, and userData in session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem('userToken', token);
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }, [token, userName, userData]);

  const contextValues = {
    token,
    userName,
    setToken,
    setUserName,
    clickedUser,
    setClickedUser,
    userData,
    setUserData,
    messages,
    setMessages,
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

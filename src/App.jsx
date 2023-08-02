import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import "./components/LandingPage/style.css";
import SignUpPage from "./pages/SIgnUp/SignUpPage";
import SignInPage from "./pages/SignIn/SignInPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import OtherUserProfile from "./pages/OtherUserProfile/OtherUserProfile";
import MessagePage from "./pages/MessageContainer/MessagePage";
import MainPage from "./pages/MainPage/MainPage";
import UserPage from "./pages/AllUsersPage/UserPage";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/signUp" element={<SignUpPage/>} />
        <Route exact path="/signIn" element={<SignInPage/>} />
        <Route exact path="/mainPage" element={<MainPage/>}/>
        <Route exact path="/profilePage" element={<ProfilePage/>} />
        <Route exact path="/userPage" element={<UserPage/>} />
        <Route exact path="/messagePage" element={<MessagePage/>}/>
        <Route exact path="/othersProfile/:users" element={<OtherUserProfile/>}/>
      </Routes>
        </>
  );
}

export default App;

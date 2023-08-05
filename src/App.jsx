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
import MainPage from "./pages/MainPage/MainPage";
import UserPage from "./pages/AllUsersPage/UserPage";
import Home from "./pages/Home";
import MessageContainer from "./pages/MessageContainer/MessagePage";
import AllMessage from "./pages/AllMessageContainer/AllMessage";
import InboxMessages from "./pages/InboxMessages/InboxMessages";
import NotFoundPage from "./pages/NOTFOUND/NotFoundPage";

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
        <Route exact path="/message/:recipientUsername" element={<MessageContainer/>}/>
        <Route exact path="/othersProfile/:Username" element={<OtherUserProfile/>}/>
        <Route exact path="/allMessage" element ={<AllMessage/>}/>
        <Route exact path="/inboxMessage" element={<InboxMessages/>}/>
        <Route element={<NotFoundPage/>}/>
      </Routes>
      
        </>
  );
}

export default App;

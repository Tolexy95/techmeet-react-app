import React from 'react'
import BottomNav from "../components/LandingPage/BottomNav";
import HeroSlider from "../components/LandingPage/HeroSlider";
import About from "../components/LandingPage/About";
// import Milestone from '../components/Milestone';
import Services from "../components/LandingPage/Services";
// import Portfolio from '../components/Portfolio';
import Team from "../components/LandingPage/Team";
import MeetDevelopers from "../components/LandingPage/MeetDevelopers";
import Blog from "../components/LandingPage/Blog";
import Footer from "../components/LandingPage/Footer";

const Home = () => {
  return (
    <div>
      <BottomNav/>
      <HeroSlider/>
      <Services/>
      <MeetDevelopers/>
      <About/>
      <Team/>
      <Blog/>
      <Footer/>
    </div>
  )
}

export default Home

//import 
import React from "react";
import RegisterButton from "./RegisterButton";
import {
  Aboutus,
  Banner,
  Faq,
  Gifs,
  HowItWorks,
  Reviews,
} from "../component/homepage";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div style={{ background: "#6d89cf" }} className="">
      <NavBar />
      <Banner />
      <Gifs />
      <HowItWorks />
      <Aboutus />
      <Reviews />
      <Faq />
      <RegisterButton />
      <Footer />
    </div>
  );
};

export default Home;

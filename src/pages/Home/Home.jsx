import React from "react";
import Slider from "../../components/Home/Slider/Slider";
import LatestBooks from "../../components/Home/LatestBooks/LatestBooks";
import Map from "../../components/Home/Map/Map";
import WhyUs from "../../components/Home/WhyUs/WhyUs";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import FAQ from "../../components/Home/FAQ/FAQ";
import CallToAction from "../../components/Home/CallToAction/CallToAction";
import PlatformStats from "../../components/Home/PlatformStats/PlatformStats";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";

const Home = () => {
  return (
    <div>
      <Slider></Slider> 
      <LatestBooks>
      </LatestBooks>
      <WhyUs></WhyUs>
      <HowItWorks></HowItWorks>
      <PlatformStats></PlatformStats>
      <Testimonials>
      </Testimonials>
      <Map></Map>
      <FAQ></FAQ>
      <CallToAction>
      </CallToAction>
    </div>
  );
};

export default Home;

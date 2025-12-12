import React from "react";
import Slider from "../../components/Home/Slider/Slider";
import LatestBooks from "../../components/Home/LatestBooks/LatestBooks";
import Map from "../../components/Home/Map/Map";
import WhyUs from "../../components/Home/WhyUs/WhyUs";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import FAQ from "../../components/Home/FAQ/FAQ";
import CallToAction from "../../components/Home/CallToAction/CallToAction";

const Home = () => {
  return (
    <div>
      <Slider></Slider> 
      <LatestBooks>
      </LatestBooks>
      <WhyUs></WhyUs>
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

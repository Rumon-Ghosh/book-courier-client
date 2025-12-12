import React from 'react';
// import Navbar from '../components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer/Footer';
import Nav from '../components/Nav/Nav';

const MainLayout = () => {
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <Nav></Nav>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
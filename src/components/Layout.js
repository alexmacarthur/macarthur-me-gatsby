import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <SEO />

      <Header>
        <Nav />
      </Header>

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;

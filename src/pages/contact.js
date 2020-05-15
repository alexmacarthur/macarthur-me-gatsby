import React from "react";
import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout";
import HeaderBar from "../components/HeaderBar";

export default ({ data }) => {
  return (
    <Layout>
      <HeaderBar>
        <h1>Contact</h1>
      </HeaderBar>

      <p>
        If you have a question about something I've built, have an issue with me
        at a deep, personal level, or are interested in hiring me for a project,
        get in touch!
      </p>

      <div
        style={{
          margin: "5rem 0 0",
        }}
      >
        <ContactForm />
      </div>
    </Layout>
  );
};

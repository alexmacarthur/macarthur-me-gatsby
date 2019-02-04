import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import Card from "../components/Card";
import Layout from "../components/Layout";
import HeaderBar from "../components/HeaderBar";

export default ({ data }) => {
  const projects = data.site.siteMetadata.projects;

  return (
    <Layout>
      <Helmet title={data.site.siteMetadata.title} />

      <HeaderBar>
        <h1>Projects</h1>
      </HeaderBar>

      <p>
        On the side, I enjoy building web tools and applications to make the
        world a little easier for someone else. Most of the time, it's in the
        WordPress and JavaScript spaces. Below is just a few of the highlights.
        To see even more,{" "}
        <a
          title="Find Alex on Github"
          href={data.site.siteMetadata.social.github}
        >
          find me on Github.
        </a>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat( auto-fit, minmax( 300px, auto ) )",
          gridGap: "15px",
          marginTop: "5rem"
        }}
      >
        {projects.map((project, i) => (
          <Card
            inGrid={true}
            fillLink={true}
            key={project.url}
            external={true}
            disableExternalIcon={true}
            title={project.title}
            path={project.url}
            date={project.url}
            postExcerpt={project.description}
          />
        ))}
      </div>
    </Layout>
  );
};

export const projectsQuery = graphql`
  query ProjectsQuery {
    site {
      siteMetadata {
        title
        social {
          github
        }
        projects {
          title
          description
          url
        }
      }
    }
  }
`;

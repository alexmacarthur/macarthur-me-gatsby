import React from "react";
import Bio from "../Bio/index.js";
import SocialIcons from "../SocialIcons";
import HeaderBar from "../HeaderBar";
import JamComments from "@jam-comments/gatsby";

import "./index.scss";

import "prismjs/themes/prism-okaidia.css";

const Post = (props) => {
  const { data } = props;

  return (
    <article className="Post">
      <HeaderBar isStacked={true}>
        <h1>{data.title}</h1>

        {data.subtitle && <h2 className="Post-subtitle">{data.subtitle}</h2>}

        {(props.publishDate || data.last_updated) && (
          <ul>
            {props.publishDate && <li>{props.publishDate}</li>}
            {data.last_updated && <li>Last Updated {data.last_updated}</li>}
          </ul>
        )}
      </HeaderBar>

      <div
        className="Post-content"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />

      {!props.isPage && (
        <div>
          <Bio content={props.shortBio} />

          <aside className="Post-footer">
            <span>
              If this was helpful, interesting, or caused some other positive
              emotion, share!
            </span>

            <SocialIcons
              shareURL={props.url}
              shareTitle={data.title}
              newTab={true}
              facebook={true}
              github={false}
            />
          </aside>

          <JamComments
            path={props.path}
            pageContext={props.pageContext}
            domain={process.env.GATSBY_JAM_COMMENTS_DOMAIN}
            apiKey={process.env.GATSBY_JAM_COMMENTS_API_KEY}
          />
        </div>
      )}
    </article>
  );
};

export default Post;

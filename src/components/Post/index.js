import React from "react";
import PropTypes from "prop-types";

import Bio from "../Bio/index.js";
import SocialIcons from "../SocialIcons";
import DisqusThread from "../DisqusThread";
import HeaderBar from "../HeaderBar";

import "./index.scss";

import "prismjs/themes/prism-okaidia.css";

class Post extends React.Component {
  render() {
    return (
      <article className="Post">
        <HeaderBar isStacked={true}>
          <h1>{this.props.data.title}</h1>

          <ul>
            {this.props.data.date && <li>{this.props.data.date}</li>}
            {this.props.data.last_updated && (
              <li>Last Updated {this.props.data.last_updated}</li>
            )}
          </ul>
        </HeaderBar>

        <div
          className="Post-content"
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />

        {!this.props.isPage && (
          <div>
            <Bio content={this.props.shortBio} />

            <aside className="Post-footer">
              <span>
                If this was helpful, interesting, or caused some other positive
                emotion, share!
              </span>

              <SocialIcons
                shareURL={this.props.url}
                shareTitle={this.props.data.title}
                newTab={true}
                facebook={true}
                github={false}
              />
            </aside>

            <DisqusThread
              shortname="macarthur-me"
              identifier={this.props.url}
              title={this.props.data.title}
              url={this.props.url}
              style={{
                margin: "4rem 0 0"
              }}
            />
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  route: PropTypes.object
};

export default Post;

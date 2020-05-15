import React from "react";
import PropTypes from "prop-types";

import ReactDisqusComments from "react-disqus-comments";

import Bio from "../Bio/index.js";
import SocialIcons from "../SocialIcons";
import HeaderBar from "../HeaderBar";

import "./index.scss";

import "prismjs/themes/prism-okaidia.css";

class Post extends React.Component {
  render() {
    return (
      <article className="Post">
        <HeaderBar isStacked={true}>
          <h1>{this.props.data.title}</h1>

          {(this.props.publishDate || this.props.data.last_updated) && (
            <ul>
              {this.props.publishDate && <li>{this.props.publishDate}</li>}
              {this.props.data.last_updated && (
                <li>Last Updated {this.props.data.last_updated}</li>
              )}
            </ul>
          )}
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

            <ReactDisqusComments
              shortname="macarthur-me"
              identifier={this.props.url}
              title={this.props.data.title}
              url={this.props.url}
              style={{
                margin: "4rem 0 0",
              }}
            />
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  route: PropTypes.object,
};

export default Post;

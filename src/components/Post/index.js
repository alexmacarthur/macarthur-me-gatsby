import React from 'react'
import PropTypes from 'prop-types'

import Bio from '../Bio/index.js'
import SocialIcons from '../SocialIcons'
import DisqusThread from '../DisqusThread';
import HeaderBar from '../HeaderBar';

import './index.scss';

import "prismjs/themes/prism-okaidia.css";

class Post extends React.Component {

  render() {

    return (
      <article className="Post">

        <HeaderBar isStacked={true}>
          <h1>
            {this.props.data.title}
          </h1>

          {this.props.data.date &&
            <span>
              {this.props.data.date}
            </span>
          }

        </HeaderBar>

        <div
          className="Post-content"
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />

        {this.props.type === 'post' &&
          <div>

            <Bio content={this.props.shortBio} />

            <aside className="Post-footer">

              <h4>If this post made you cheer, vomit, giggle, or cry, share it.</h4>

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
        }

      </article>
    )
  }
}

Post.propTypes = {
  route: PropTypes.object,
}

export default Post

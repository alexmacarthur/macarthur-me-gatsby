import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Bio from '../Bio/index.js'
import SocialIcons from '../SocialIcons'
import DisqusThread from '../DisqusThread';

//-- Styles.
require("prismjs/themes/prism-okaidia.css");
import styles from './index.scss'

class Post extends React.Component {

  render() {

    return (
      <article className="Post">

        <header className="Post-header">
          <h1 className="Post-title">
            {this.props.data.title}
          </h1>

          { this.props.data.date &&
            <date className="Post-date">
              {this.props.data.date}
            </date>
          }

        </header>

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

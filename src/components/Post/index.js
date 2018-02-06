import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import SocialIcons from '../SocialIcons'

import ReactDisqusThread from 'react-disqus-thread';

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

            <ReactDisqusThread
              shortname="macarthur-me"
              identifier={this.props.url}
              title={this.props.data.title}
              url={this.props.url}
              style={{
                margin: "4rem 0 0"
              }}
            />

            <aside className="Post-footer">

              <h4>If this post made you cheer, vomit, giggle, or cry, spread it.</h4>

              <SocialIcons
                shareURL={this.props.url}
                shareTitle={this.props.data.title}
                newTab={true}
                facebook={true}
                github={false}
              />

            </aside>
          </div>
        }

      </article>
    )
  }
}

Post.propTypes = {
  route: React.PropTypes.object,
}

export default Post

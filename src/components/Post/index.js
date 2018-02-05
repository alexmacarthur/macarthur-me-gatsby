import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import SocialIcons from '../SocialIcons'

import DisqusThread from 'react-disqus-thread';

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
        }

        <DisqusThread
          shortname="example"
          identifier="something-unique-12345"
          title="Example Thread"
          url="http://www.example.com/example-thread"
          category_id="123456"
          onNewComment={this.handleNewComment}
        />


      </article>
    )
  }
}

Post.propTypes = {
  route: React.PropTypes.object,
}

export default Post

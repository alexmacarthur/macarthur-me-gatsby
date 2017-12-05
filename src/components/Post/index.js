import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

//-- Styles.
import styles from './index.scss'

class Post extends React.Component {

  render() {
    return (
      <article className="Post">
        <Helmet title={`${this.props.postData.title}`} />
        <h1 className="Post-title">
          {this.props.postData.title}
        </h1>
        <date className="Post-date">
          {this.props.postData.date}
        </date>
        <div
          className="Post-content"
          dangerouslySetInnerHTML={{ __html: this.props.postContent }}
        />
      </article>
    )
  }
}

Post.propTypes = {
  route: React.PropTypes.object,
}

export default Post

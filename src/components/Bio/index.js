import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import styles from './index.scss'
import pic from './bio.jpg';

class Bio extends React.Component {

  render() {
    return (
      <aside className="Bio">
        <img className="Bio-image" src={pic} />
        <p className="Bio-content">{this.props.content}</p>
      </aside>
    )
  }
}

Bio.propTypes = {
  route: React.PropTypes.object,
}

export default Bio

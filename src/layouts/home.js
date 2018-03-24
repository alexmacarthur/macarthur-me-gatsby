import React from 'react'
import PropTypes from 'prop-types'

import SEO from "../components/SEO"

//-- Base styles.
import '../../assets/scss/style.scss'

class Template extends React.Component {

  render() {

    const { location, children } = this.props;

    return (
      <div>
        <SEO />
        {children()}
      </div>
    )
  }
}

Template.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object,
}

export default Template


import React from 'react'
import PropTypes from 'prop-types'
import BaseHelmet from '../components/BaseHelmet'

//-- Base styles.
import '../../assets/scss/style.scss'

class Template extends React.Component {
  render() {

    const { location, children } = this.props;

    return (
      <div>
        <BaseHelmet />

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


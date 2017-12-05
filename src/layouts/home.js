import React from 'react'
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
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template


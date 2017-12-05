import React from 'react'

import BaseHelmet from '../components/BaseHelmet'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

//-- Base styles.
import '../../assets/scss/style.scss'

class Template extends React.Component {
  render() {

    const { location, children } = this.props;

    return (
      <div>
        <BaseHelmet />

        <Nav isTop={true} type="short" />

        <main>
          {children()}
        </main>

        <Footer />
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

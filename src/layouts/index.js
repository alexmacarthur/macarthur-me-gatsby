import React from 'react'
import PropTypes from 'prop-types'

import BaseHelmet from '../components/BaseHelmet'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

//-- Base styles.
import '../../assets/scss/style.scss'

class MainLayout extends React.Component {
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

MainLayout.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object,
}

export default MainLayout

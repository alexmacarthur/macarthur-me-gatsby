import React from 'react'
import PropTypes from 'prop-types'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

//-- Base styles.
import '../../assets/scss/style.scss'

class MainLayout extends React.Component {

  componentDidUpdate() {
    window.slice.style.height = `${document.documentElement.scrollHeight}px`;
  }

  render() {

    const { location, children } = this.props;
    
    return <div>
        <SEO />

        <Nav isTop={true} type="short" />

        <main>{children()}</main>

        <Footer />
      </div>;
  }
}

MainLayout.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object,
}

export default MainLayout

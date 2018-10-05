import React from 'react'
import PropTypes from 'prop-types'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Banner from "components/Banner";

class Layout extends React.Component {

    render() {

        const {
            children
        } = this.props;

        return (
            <div>
                <SEO />

                <Banner />

                <Nav isTop={ true } type="short" />

                <main>
                    { children }
                </main>

                <Footer/>
            </div>
        );
    }
}

Layout.propTypes = {
    route: PropTypes.object
}

export default Layout

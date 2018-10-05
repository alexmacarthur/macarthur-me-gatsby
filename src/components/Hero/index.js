import React from 'react'
import PropTypes from 'prop-types'

//-- Components.
import Nav from '../Nav'
import SocialIcons from '../SocialIcons'

//-- Styles.
import './index.scss'

class Hero extends React.Component {

  render() {
    return (
      <main className="Hero">
        <div className="Hero-wrapper">
          <div>
            <h1 className="Hero-title" id="heroTitle" ref={(el) => { this.el = el; }}>
              <span>I'm </span>
              Alex<br></br>
              MacArthur,
            </h1>

            <div className="Hero-bottomWrapper">
              <h2 className="Hero-subTitle">
                A web developer.
              </h2>
              <SocialIcons 
                newTab={true}
              />
            </div>
          </div>
          <Nav type="short"/>
        </div>
      </main>
    )
  }
}

Hero.propTypes = {
  route: PropTypes.object,
}

export default Hero

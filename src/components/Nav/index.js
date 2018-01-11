import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import styles from './index.scss';

class Nav extends React.Component {

  constructor() {
    super();

    this.state = {
      isOpen: false,
      links: {
        about: {
          long: 'Who is this guy?',
          short: 'About',
          path: '/about'
        },
        projects: {
          long: 'What\'s he even built?',
          short: 'Projects',
          path: '/projects'
        },
        contact: {
          long: 'How can I contact him?',
          short: 'Contact',
          path: '/contact'
        }
      }
    }

    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
  }

  componentDidMount() {
    window.closeNav = () => {
      this.closeNav();
    }
  }

  openNav() {
    this.setState({
      isOpen: true
    });
  }

  closeNav() {
    this.setState({
      isOpen: false
    });
  }

  render() {

    return (
      <nav className={
        "Nav" +
        (this.props.isTop ? " Nav--top" : " ") +
        (this.state.isOpen ? " is-open" : " ")
      }>

        { this.props.isTop &&
          <Link
            className="Nav-logo"
            to="/">
            <span>A</span>M
          </Link>
        }

        <ul className={"Nav-list"}>

          {Object.keys(this.state.links).map((key) => {
            return(
              <li className="Nav-item" key={key}>
                <Link to={this.state.links[key].path}>
                  {this.state.links[key][this.props.type]}
                </Link>
              </li>
            )
          })}

        </ul>

        <div className="Nav-close" onClick={this.closeNav}>
          <svg viewBox="0 0 40 40">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </div>

        <button className="Nav-toggle" onClick={this.openNav}>
          Menu
        </button>

      </nav>
    )
  }
}

Nav.defaultProps = {
  type: 'short'
};

export default Nav

import React from "react";
import Link from "gatsby-link";

import "./index.scss";

class Nav extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      links: [
        {
          name: "Posts",
          path: "/posts"
        },
        {
          name: "Notes",
          path: "/notes"
        },
        {
          name: "About",
          path: "/about"
        },
        {
          name: "Contact",
          path: "/contact"
        }
      ]
    };

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  componentDidMount() {
    window.closeNav = () => {
      this.closeNav();
    };
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
      <nav
        className={
          "Nav" +
          (this.props.isTop ? " Nav--top" : " ") +
          (this.state.isOpen ? " is-open" : " ")
        }
      >
        {this.props.isTop && (
          <Link className="Nav-logo" to="/">
            <span>Alex</span>MacArthur
          </Link>
        )}

        <ul className={"Nav-list"}>
          {this.state.links.map(item => {
            return (
              <li className="Nav-item" key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            );
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
    );
  }
}

Nav.defaultProps = {
  type: "short"
};

export default Nav;

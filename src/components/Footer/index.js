import React from 'react'
import Link from "gatsby-link"

import styles from './index.scss';

class Footer extends React.Component {
  render() {

    const date = new Date();

    return (
      <footer className="Footer">
        <span className="Footer-copyright">
          &copy; Alex MacArthur | {date.getFullYear()}
        </span>
      </footer>
    )
  }
}

export default Footer

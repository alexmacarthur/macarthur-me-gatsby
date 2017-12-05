import React from 'react'
import IconGithub from '-!svg-react-loader?name=Icon!../../../assets/img/github.svg';
import IconTwitter from '-!svg-react-loader?name=Icon!../../../assets/img/twitter.svg';
import IconLinkedIn from '-!svg-react-loader?name=Icon!../../../assets/img/linkedin.svg';

import styles from './index.scss';

class SocialIcons extends React.Component {
  render() {
    return (
      <ul className="SocialIcons">
        <li className="SocialIcons-icon">
          <a href="https://www.github.com/alexmacarthur">
            <IconGithub />
          </a>
        </li>
        <li className="SocialIcons-icon">
          <a href="https://www.twitter.com/amacarthur">
            <IconTwitter />
          </a>
        </li>
        <li className="SocialIcons-icon">
          <a href="https://www.linkedin.com/in/alexmacarthur">
            <IconLinkedIn />
          </a>
        </li>
      </ul>
    )
  }
}

export default SocialIcons

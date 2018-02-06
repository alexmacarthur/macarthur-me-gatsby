import React from 'react'
import get from 'lodash/get'

import IconGithub from '-!svg-react-loader?name=Icon!../../../assets/img/github.svg';
import IconTwitter from '-!svg-react-loader?name=Icon!../../../assets/img/twitter.svg';
import IconLinkedIn from '-!svg-react-loader?name=Icon!../../../assets/img/linkedin.svg';
import IconFacebook from '-!svg-react-loader?name=Icon!../../../assets/img/facebook.svg';

import styles from './index.scss';

import config from '../../../gatsby-config.js';

class SocialIcons extends React.Component {
  render() {

    let target = this.props.newTab ? '_blank' : '_self';

    //-- Set default link values.
    let links = {
      github: config.siteMetadata.social.github,
      twitter: config.siteMetadata.social.twitter,
      facebook: config.siteMetadata.social.facebook,
      linkedin: config.siteMetadata.social.linkedin
    };

    //-- If props provide a share URL, modify link values.
    if(this.props.shareURL) {
      links.twitter = `https://twitter.com/intent/tweet?text=${this.props.shareTitle} - ${config.siteMetadata.social.twitterHandle} ${this.props.shareURL}`;
      links.facebook = `https://www.facebook.com/sharer/sharer.php?u=${this.props.shareURL}`;
      links.linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${this.props.shareURL}&title=${this.props.shareTitle}&source=${config.siteMetadata.siteUrl}`;
    }

    return (
      <ul className="SocialIcons">
        { this.props.github &&
          <li className="SocialIcons-icon">
            <a target={target} href={links.github}>
              <IconGithub />
            </a>
          </li>
        }

        { this.props.twitter &&
          <li className="SocialIcons-icon">
            <a target={target} href={links.twitter}>
              <IconTwitter />
            </a>
          </li>
        }

        { this.props.linkedin &&
          <li className="SocialIcons-icon">
            <a target={target} href={links.linkedin}>
              <IconLinkedIn />
            </a>
          </li>
        }

        { this.props.facebook &&
          <li className="SocialIcons-icon">
            <a target={target} href={links.facebook}>
              <IconFacebook />
            </a>
          </li>
        }
      </ul>
    )
  }
}

SocialIcons.defaultProps = {
  twitter: true,
  github: true,
  linkedin: true,
  facebook: false
};

export default SocialIcons

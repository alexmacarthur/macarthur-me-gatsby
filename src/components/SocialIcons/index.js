import React from "react";

import IconGithub from "-!svg-react-loader?name=Icon!../../../assets/img/github.svg";
import IconTwitter from "-!svg-react-loader?name=Icon!../../../assets/img/twitter.svg";
import IconLinkedIn from "-!svg-react-loader?name=Icon!../../../assets/img/linkedin.svg";
import IconFacebook from "-!svg-react-loader?name=Icon!../../../assets/img/facebook.svg";

import "./index.scss";

import config from "../../../gatsby-config.js";

class SocialIcons extends React.Component {
  render() {
    let target = this.props.newTab ? "_blank" : "_self";

    //-- Set default link values.
    let links = {
      github: config.siteMetadata.social.github,
      twitter: config.siteMetadata.social.twitter,
      facebook: config.siteMetadata.social.facebook,
      linkedin: config.siteMetadata.social.linkedin
    };

    //-- If props provide a share URL, modify link values.
    if (this.props.shareURL) {
      let encodedTitle = encodeURIComponent(this.props.shareTitle);

      links.twitter = `https://twitter.com/intent/tweet?text=${encodedTitle} - ${config.siteMetadata.social.twitterHandle} ${this.props.shareURL}`;
      links.twitter = `https://twitter.com/intent/tweet?text=${encodedTitle} - ${config.siteMetadata.social.twitterHandle} ${this.props.shareURL}`;
      links.facebook = `https://www.facebook.com/sharer/sharer.php?u=${this.props.shareURL}`;
      links.linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${this.props.shareURL}&title=${encodedTitle}&source=${config.siteMetadata.siteUrl}`;
    }

    let label = this.props.shareURL ? "Share on" : "Alex on";

    return (
      <ul className="SocialIcons">
        {this.props.github && (
          <li className="SocialIcons-icon">
            <a
              target={target}
              href={links.github}
              aria-label={`${label} GitHub`}
              rel="noopener noreferrer"
            >
              <IconGithub />
            </a>
          </li>
        )}

        {this.props.twitter && (
          <li className="SocialIcons-icon">
            <a
              target={target}
              href={links.twitter}
              aria-label={`${label} Twitter`}
              rel="noopener noreferrer"
            >
              <IconTwitter />
            </a>
          </li>
        )}

        {this.props.linkedin && (
          <li className="SocialIcons-icon">
            <a
              target={target}
              href={links.linkedin}
              aria-label={`${label} LinkedIn`}
              rel="noopener noreferrer"
            >
              <IconLinkedIn />
            </a>
          </li>
        )}

        {this.props.facebook && (
          <li className="SocialIcons-icon">
            <a
              target={target}
              href={links.facebook}
              aria-label={`${label} Facebook`}
              rel="noopener noreferrer"
            >
              <IconFacebook />
            </a>
          </li>
        )}
      </ul>
    );
  }
}

SocialIcons.defaultProps = {
  twitter: true,
  github: true,
  linkedin: true,
  facebook: false
};

export default SocialIcons;

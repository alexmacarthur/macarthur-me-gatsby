import React from "react";
import Link from "gatsby-link";
import url from "url";

import IconExternal from "-!svg-react-loader?name=Icon!../../../assets/img/external.svg";

import styles from "./index.module.scss";

class Card extends React.Component {
  render() {
    let link;

    if (this.props.external) {
      link = (
        <a
          className={`
            ${styles.link} 
            ${!this.props.disableExternalIcon ? styles.isExternal : ""}
          `}
          href={this.props.path}
          target="_blank"
          rel="noopener noreferrer"
          title={this.props.title}
        >
          {this.props.title}

          {!this.props.disableExternalIcon && (
            <i className={styles.icon}>
              <IconExternal />
            </i>
          )}
        </a>
      );
    } else {
      link = (
        <Link
          className={styles.link}
          to={this.props.path}
          title={this.props.title}
        >
          {this.props.title}
        </Link>
      );
    }

    return (
      <article className={styles.card} key={this.props.path}>
        <h3 className={styles.title}>{link}</h3>

        <small>{this.props.date}</small>

        {this.props.external && !this.props.disableExternalIcon && (
          <small> / {url.parse(this.props.path).host}</small>
        )}

        <p
          dangerouslySetInnerHTML={{
            __html: this.props.postExcerpt
          }}
        />
      </article>
    );
  }
}

export default Card;

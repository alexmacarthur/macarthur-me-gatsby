import React from "react";
import Link from "gatsby-link";
import url from "url";

import IconExternal from "-!svg-react-loader?name=Icon!../../../assets/img/external.svg";

//-- Styles.
import "./index.scss";

class Card extends React.Component {
  render() {
    let link;

    if (this.props.external) {
      link = (
        <a
          className={
            "Card-link" +
            (!this.props.disableExternalIcon ? " is-external" : "")
          }
          href={this.props.path}
          target="_blank"
          rel="noopener noreferrer"
          title={this.props.title}
        >
          {this.props.title}

          {!this.props.disableExternalIcon && (
            <i className="Card-icon">
              <IconExternal />
            </i>
          )}
        </a>
      );
    } else {
      link = (
        <Link
          className="Card-link"
          to={this.props.path}
          title={this.props.title}
        >
          {this.props.title}
        </Link>
      );
    }

    return (
      <article
        className={"Card" + (this.props.inGrid ? " Card--inGrid" : "")}
        key={this.props.path}
      >
        <h3 className="Card-title">{link}</h3>

        <small>{this.props.date}</small>

        {this.props.external && !this.props.disableExternalIcon && (
          <small> / {url.parse(this.props.path).host}</small>
        )}

        <p
          className="Card-content"
          dangerouslySetInnerHTML={{
            __html: this.props.postExcerpt
          }}
        />
      </article>
    );
  }
}

export default Card;

import React from 'react'
import Link from 'gatsby-link'

//-- Styles.
import './index.scss'

class Card extends React.Component {

  render() {

    let link;

    if(this.props.externalLink) {
      link = <a href={this.props.path} title={this.props.title}>{this.props.title}</a>
    } else {
      link =
        <Link to={this.props.path} title={this.props.title} >
          {this.props.title}
        </Link>
    }

    return (
      <article
        className={"Card" + (this.props.inGrid ? " Card--inGrid" : "")}
        key={this.props.path}>

        <h3 className="Card-title">
          { link }
        </h3>

        <small>{this.props.date}</small>
        <p
          className="Card-content"
          dangerouslySetInnerHTML={{ __html: this.props.postExcerpt }} />
      </article>
    )
  }
}

export default Card

import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

//-- Styles.
import styles from './index.scss'

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

        {this.props.fillLink &&
          <a title="" className="Card-fillLink" href={this.props.path}></a>
        }

        <h4 className="Card-title">
          { link }
        </h4>
        <small>{this.props.date}</small>
        <p
          className="Card-content"
          dangerouslySetInnerHTML={{ __html: this.props.postExcerpt }} />
      </article>
    )
  }
}

export default Card

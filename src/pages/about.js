import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import ContactForm from '../components/ContactForm'

export default ({ data }) => {

  return (
  <div>
      <h1>About</h1>

      <p>I'm husband to Hannah, dad to Autumn & Pippa, and web developer for <a href="https://www.daveramsey.com">Dave Ramsey</a> in Nashville, TN. We moved here in 2015 from Minnesota, where "soda" is just shorthand for the stuff you mix with vinegar to create a volcano for a junior high science fair.</p>

      <p>I specialize in building custom WordPress and JavaScript applications that meet the unique needs of those I'm serving. I'm interested in helping you too. [Let's connect](/contact) to get the process started.</p>

      <p>To stay updated on what I'm building and/or blabbing about, follow me on <a href="https://www.twitter.com/amacarthur">Twitter</a> and <a href="https://github.com/alexmacarthur">GitHub</a>.</p>

    </div>
  )
}

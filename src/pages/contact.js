import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import ContactForm from '../components/ContactForm'

export default ({ data }) => {

  return (
  <div>
      <h1>Contact</h1>

      <p>
        If you have a question about something I've built, have an issue with me at a deep, personal level, or are interested in hiring me for a project, get in touch!
      </p>

      <div style={{
        margin: '5rem 0 0'
      }}>
        <ContactForm />
      </div>

    </div>
  )
}

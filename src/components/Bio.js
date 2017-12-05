import React from 'react'
import styled from 'styled-components';

import profilePic from './profile-pic.jpg'

const p = styled.p`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

class Bio extends React.Component {
  render() {
    return (
      <p>
        <img
          src={profilePic}
          alt={`Kyle Mathews`}
        />
        Written by <strong>Alex MacArthur</strong> a developer in Nashville, TN.{' '}
      </p>
    )
  }
}

export default Bio

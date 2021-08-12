import React from 'react';
import Header from './components/Header.js'
import ReviewSquare from './components/ReviewSquare.js'

/* Load in the JSON of reviews here */
const reviews = require('./reviews.json')

class Index extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ReviewSquare />
      </>
    )
  }
}

export default Index;

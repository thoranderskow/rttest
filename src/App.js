import React from 'react';
import Body from './components/Body.js'
import Header from './components/Header.js'

/* Load in the JSON of reviews here */
const reviews = require('./jsons/reviews.json')

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Header />
        <Body reviews={reviews}/>
      </>
    )
  }
}

export default Index;

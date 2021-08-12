import React from 'react';
import Body from './components/Body.js'
import Header from './components/Header.js'

/* Load in the JSON of reviews here */
const reviews = require('./reviews.json')

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Header />
        {true ? <Body reviews={reviews}/> : <Header />}
      </>
    )
  }
}

export default Index;

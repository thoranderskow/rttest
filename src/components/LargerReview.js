import React from 'react';
import ReviewSquare from './ReviewSquare.js'

const style = {
  width: "100vw"
}

class LargerReview extends React.Component {
  constructor(props) {
   super(props);
 }
  render() {
    return (
      <>
        <ReviewSquare id={this.props.children['id']} review={this.props.children} selSquare={(k) => {console.log("todo")}} width="85%"/>
      </>
    )
  }
}

export default LargerReview;

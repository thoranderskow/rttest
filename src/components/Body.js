import React from 'react';
import ReviewSquare from './ReviewSquare.js'

const reviewsContainerStyle = {
  display: "flex",
  flexWrap: "wrap"
}

class Body extends React.Component {
  constructor(props) {
   super(props);
 }
  render() {
    const { reviews } = this.props;
    const reviewSquares = reviews.map((review) =>
      <ReviewSquare review={review}/>
    );

    return (
      <>
        <div style={reviewsContainerStyle}>
          {reviewSquares}
        </div>
      </>
    )
  }
}

export default Body;

import React from 'react';
import ReviewSquare from './ReviewSquare.js'

const reviewsContainerStyle = {
  display: "flex",
  flexWrap: "wrap"
}

class Body extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     squareClicked: false,
     reviewSquareId: "yo"
   }
   this.selectSquare = this.selectSquare.bind(this);
 }
 selectSquare(key) {
   this.setState((state) => ({
     squareClicked: true,
     reviewSquareId: key
   }));
   console.log(key)
 }
 render() {
   const { reviews } = this.props;
   const reviewSquares = reviews.map((review) =>
      <ReviewSquare key={review['id']} id={review['id']} review={review} selSquare={this.selectSquare}/>
    );

    return (
      <>
      {this.state.reviewSquareId}
        <div style={reviewsContainerStyle}>
          {reviewSquares}
        </div>
      </>
    )
  }
}

export default Body;

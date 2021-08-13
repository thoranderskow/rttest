import React from 'react';
import ReviewSquare from './ReviewSquare.js'
import LargerReview from './LargerReview.js'

const reviewsContainerStyle = {
  display: "flex",
  flexWrap: "wrap"
}

class Body extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     squareClicked: false,
     reviewSquareId: ""
   }
   this.selectSquare = this.selectSquare.bind(this);
 }
 selectSquare(key) {
   this.setState((state) => ({
     squareClicked: true,
     reviewSquareId: key
   }));
 }
 render() {
   const { reviews } = this.props;
   const reviewSquares = reviews.map((review) =>
      <ReviewSquare id={review['id']} review={review} selSquare={this.selectSquare} width="250px" height="200px" hideOverflow={true}/>
    );
   const largeReviewSquare = this.state.squareClicked ?
   reviews.filter(revObj => {
     return revObj.id === this.state.reviewSquareId
   }) : <div />

    return (
      <>
        {this.state.squareClicked ?
          <LargerReview children={largeReviewSquare[0]} />
          : (<div style={reviewsContainerStyle}>
            {reviewSquares}
            </div>)}
      </>
    )
  }
}

export default Body;

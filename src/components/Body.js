import React from 'react';
import ReviewSquare from './ReviewSquare.js'
import LargerReview from './LargerReview.js'

/*
  Uses state.squareClicked to switch between multi-review view
  and single review + response view. Secret key for calls to json bin
  is out in plain text; normally you would want to set that as an environment
  variable.
*/

const reviewsContainerStyle = {
  display: "flex",
  flexWrap: "wrap"
}

class Body extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     squareClicked: false,
     reviewSquareId: "",
     allComments: []
   }
   this.selectSquare = this.selectSquare.bind(this);
   this.unSelectSquare = this.unSelectSquare.bind(this);
 }
 componentDidMount() {
   let req = new XMLHttpRequest();
   req.onreadystatechange = () => {
     if (req.readyState == XMLHttpRequest.DONE) {
       const comments = JSON.parse(req.responseText);
       this.setState({allComments: comments});
     }
   };
   req.open("GET", "https://api.jsonbin.io/b/6119422653ca131484aa3c25/4", true);
   req.setRequestHeader("secret-key", "$2b$10$W5Z5x.jATbqUl7Bpw.DMTuTUGv37YB5rLfkN476XHZq5HsIE1flZK");
   req.send();
 }
 selectSquare(key) {
   this.setState((state) => ({
     squareClicked: true,
     reviewSquareId: key
   }));
 }
 unSelectSquare() {
   this.setState((state) => ({
     squareClicked: false,
     reviewSquareId: ""
   }));
 }
 render() {
   const { reviews } = this.props;
   const reviewSquares = reviews.map((review) => {
     const reply = this.state.allComments.filter((comment) => {
       return comment['postid'] === review['id']
     })
     const replyExists = (reply.length === 0) ? false : true
      return (
      <ReviewSquare id={review['id']}
        review={review}
        selSquare={this.selectSquare}
        width="250px"
        height="200px"
        hideOverflow={true}
        replyExists={replyExists}/>
      );
    });
   const largeReviewSquare = this.state.squareClicked ?
   reviews.filter(revObj => {
     return revObj.id === this.state.reviewSquareId
   }) : <div />

    return (
      <>
        {this.state.squareClicked ?
          <LargerReview children={largeReviewSquare[0]} revert={this.unSelectSquare}/>
          : (<div style={reviewsContainerStyle}>
            {reviewSquares}
            </div>)}
      </>
    )
  }
}

export default Body;

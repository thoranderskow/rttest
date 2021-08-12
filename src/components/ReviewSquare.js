import React from 'react';
import reviewStar from '../reviewStar.png'

const reviewSquareStyle = {
  width: "250px",
  height: "200px",
  marginLeft: "120px",
  marginTop: "40px",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column"
}

const contentStyle = {
  marginLeft: "15px"
}

const reviewStarStyle = {
  width: "25px",
  height: "20px"
}

const nameDateContainerStyle = {
  display: "flex",
}

class ReviewSquare extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const starIter = new Array(5).fill(0)
    const stars = starIter.map(() =>
      <img src={reviewStar} style={reviewStarStyle} alt="stars"/>
    );

    return (
      <>
        <div style={reviewSquareStyle}>

          <div style={contentStyle}>
            <p>Helo</p>
            <div>
              {stars}
            </div>
            <p>So good!</p>
            <div style={nameDateContainerStyle}>
              <div>d</div>
              <div>d</div>
            </div>
          </div>

        </div>
      </>
    )
  }
}

export default ReviewSquare;

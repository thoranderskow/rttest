import React from 'react';
import reviewStar from '../reviewStar.png'

const reviewSquareStyle = {
  width: "250px",
  height: "200px",
  marginLeft: "120px",
  marginTop: "40px",
  marginBottom: "50px",
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

/* styling found at https://stackoverflow.com/a/19045706/10827114 */
const reviewStyle = {
  textOverflow: "ellipsis",
  display: "block",
  width: "90%",
  overflow: "hidden",
  whiteSpace: "nowrap",
}

const nameDateContainerStyle = {
  display: "flex",
  marginTop: "60px"
}

const dateStyle = {
  marginLeft: "20px"
}

function parseDate(str) {
  str = str.split(" ");
  let retstr = ""
  switch(str[1]) {
    case "Jan":
      retstr = "01";
      break;
    case "Feb":
      retstr = "02";
      break;
    case "Mar":
      retstr = "03";
      break;
    case "Apr":
      retstr = "04";
      break;
    case "Feb":
      retstr = "05";
      break;
    case "Jun":
      retstr = "06";
      break;
    case "Jul":
      retstr = "07";
      break;
    case "Aug":
      retstr = "08";
      break;
    case "Sep":
      retstr = "09";
      break;
    case "Oct":
      retstr = "10";
      break;
    case "Nov":
      retstr = "11";
      break;
    case "Dec":
      retstr = "12";
      break;
  }
  retstr += "/" + str[2] + "/" + str[3];
  return retstr
}

class ReviewSquare extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { review } = this.props;
    const { author, place, published_at, rating, content } = review;
    const date = parseDate(published_at);
    const starIter = new Array(rating).fill(0);
    const stars = starIter.map(() =>
      <img src={reviewStar} style={reviewStarStyle} alt="stars"/>
    );

    return (
      <>
        <div style={reviewSquareStyle}>

          <div style={contentStyle}>
            <p>{place}</p>
            <div>
              {stars}
            </div>
            <p style={reviewStyle}>{content}</p>
            <div style={nameDateContainerStyle}>
              <div>{author}</div>
              <div style={dateStyle}>{date}</div>
            </div>
          </div>

        </div>
      </>
    )
  }
}

export default ReviewSquare;

import React from 'react';
import reviewStar from '../reviewStar.png'

const allTextStyle = {
  marginLeft: "15px"
}

const reviewStarStyle = {
  width: "25px",
  height: "20px"
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
  retstr += '/' + str[2] + '/' + str[3];
  return retstr
}

class ReviewSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      hideOverflow: this.props.hideOverflow
    }
  }
  render() {
    const { id, review, selSquare } = this.props;
    const { author, place, published_at, rating, content } = review;
    const date = parseDate(published_at);
    const starIter = new Array(rating).fill(0);
    const stars = starIter.map(() =>
      <img src={reviewStar} style={reviewStarStyle} alt="stars"/>
    );
    const selSquareWrapper = () => {
      selSquare(id);
    }
    let reviewSquareStyle = {
      width: this.state.width,
      height: this.state.height,
      marginLeft: "120px",
      marginTop: "40px",
      marginBottom: "50px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
    }
    /* styling found at https://stackoverflow.com/a/19045706/10827114 */
    const reviewContentStyle = this.state.hideOverflow ? {
      textOverflow: "ellipsis",
      display: "block",
      width: "90%",
      overflow: "hidden",
      whiteSpace: "nowrap",
    } : {
    }

    return (
      <>
        <div style={reviewSquareStyle} onClick={selSquareWrapper}>

          <div style={allTextStyle}>
            <p>{place}</p>
            <div>
              {stars}
            </div>
            <p style={reviewContentStyle}>{content}</p>
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

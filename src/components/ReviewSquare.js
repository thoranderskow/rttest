import React from 'react';
import chatBubble from '../bluespeechbubble.png'
import reviewStar from '../reviewStar.png'

/*
  Uses state to allow it to generate a larger review square in LargerReview.js
  and many small ones in Body.js.
*/

const authorNameStyle = {
  fontFamily: '"Monaco", Times, serif',
  fontSize: "0.7em"
}

const chatBubbleStyle = {
  height: "20px",
  width: "20px",
  marginTop: "5px",
  marginRight: "5px"
}

const dateStyle = {
  marginLeft: "20px",
  color: "#c9c9c9"
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "bold",
  fontFamily: '"Monaco", Times, serif',
}

const nameDateContainerStyle = {
  display: "flex",
  marginTop: "60px"
}

const reviewStarStyle = {
  width: "25px",
  height: "20px"
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
    const { id, review, selSquare, replyExists } = this.props;
    const { author, place, published_at, rating, content } = review;
    const date = parseDate(published_at);
    const starIter = new Array(rating).fill(0);
    const stars = starIter.map(() =>
      <img src={reviewStar} style={reviewStarStyle} alt="stars"/>
    );
    const selSquareWrapper = () => {
      selSquare(id);
    }
    /* styling placed here so as to use state as part of css */
    const allTextStyle = {
      marginLeft: this.state.hideOverflow ? "15px" : "50px"
    }
    /* styling found at https://stackoverflow.com/a/19045706/10827114 */
    const reviewContentStyle = {
      textOverflow: "ellipsis",
      display: "block",
      width: "90%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      color: "#858585",
      marginRight: this.state.hideOverflow ? "0px" : "50px"
    }
    const reviewSquareStyle = {
      width: this.state.width,
      height: this.state.height,
      marginLeft: "120px",
      marginTop: this.state.hideOverflow ? "40px" : "20px",
      marginBottom: "50px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)"
    }

    return (
      <>
        <div style={reviewSquareStyle} onClick={selSquareWrapper}>

          <div style={allTextStyle}>
            <div style={headerStyle}>
              <p>{place}</p>
              {replyExists ? <img style={chatBubbleStyle} src={chatBubble}/> : <div/>}
            </div>
            <div>
              {stars}
            </div>
            <p style={reviewContentStyle}>{content}</p>
            <div style={nameDateContainerStyle}>
              <div style={authorNameStyle}>{author}</div>
              <div style={dateStyle}>{date}</div>
            </div>
          </div>

        </div>
      </>
    )
  }
}

export default ReviewSquare;

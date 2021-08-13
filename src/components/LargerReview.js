import React from 'react';
import ReviewSquare from './ReviewSquare.js'

const replyBoxStyle = {
  width: "85%",
  height: "100px",
  backgroundColor: "white",
  marginLeft: "120px",
}

const replyBoxContentStyle = {
  marginLeft: "15px"
}

const textAreaStyle = {
  width: "98%"
}

const textInputStyle = {
  width: "100%",
  height: "20px"
}

class LargerReview extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     action: "Leave a reply",
     message: "",
   }
   this.handleChange = this.handleChange.bind(this);
 }
 handleChange(event) {
    event.preventDefault();
    this.setState({message: event.target.value});
  }
  render() {
    return (
      <>
        <ReviewSquare id={this.props.children['id']} review={this.props.children} selSquare={(k) => {console.log("todo")}} width="85%"/>
        <div style={replyBoxStyle}>
          <div style={replyBoxContentStyle}>
            {this.state.action}
            <div style={textAreaStyle}>
              <textarea id="reply" style={textInputStyle} maxlength='500' type='text' value={this.state.message} onChange={this.handleChange} placeHolder='enter comment'/>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default LargerReview;

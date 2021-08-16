import React from 'react';
import ReviewSquare from './ReviewSquare.js'

/*
  Responses are stored on https://jsonbin.io/, in a list of objects that
  contains the field postid, which refers to the review id of the review
  that the response was made to.
*/

const editButtonStyle = {
  cursor: "pointer",
  alignSelf: "flex-end",
  marginRight: "10px",
  marginTop: "5px",
  marginBottom: "5px"
}

const replierNameStyle = {
  marginTop: "30px",
  fontFamily: '"Monaco", Times, serif',
  fontSize: "0.7em"
}

const replyBoxContentStyle = {
  marginLeft: "50px",
  display: "flex",
  flexDirection: "column"
}

const replyBoxStyle = {
  width: "85%",
  height: "100px",
  backgroundColor: "white",
  marginLeft: "120px",
  boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)"
}

const replyStyle = {
  color: "#858585"
}

const returnButtonStyle = {
  marginTop: "10px",
  marginLeft: "120px",
  cursor: "pointer"
}

const submitButtonStyle = {
  width: "70px"
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
     reply: "",
     allComments: [],
     responsePresent: false,
     leaveReplyPressed: false
   }
   this.handleChange = this.handleChange.bind(this);
   this.submitComment = this.submitComment.bind(this);
   this.startEditing = this.startEditing.bind(this);
   this.cancelEdit = this.cancelEdit.bind(this);
   this.revertWrapper = this.revertWrapper.bind(this);
 }
 handleChange(event) {
    event.preventDefault();
    this.setState({message: event.target.value});
  }
  componentDidMount() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        const comments = JSON.parse(req.responseText);
        this.setState({allComments: comments})
        const comment = comments.filter((obj) => {
          return obj.postid === this.props.children['id']
        });
        if (comment.length !== 0) {
          this.setState({
            responsePresent: true,
            action: "Edit Response",
            reply: comment[0]['reply'],
            leaveReplyPressed: true
          });
        }
      }
    };
    req.open("GET", "https://api.jsonbin.io/b/6119422653ca131484aa3c25/4", true);
    req.setRequestHeader("secret-key", "$2b$10$W5Z5x.jATbqUl7Bpw.DMTuTUGv37YB5rLfkN476XHZq5HsIE1flZK");
    req.send();
  }
  submitComment() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
      }
    };
    let editComments = this.state.allComments;
    let id = this.props.children['id']
    let newComments = editComments.filter((obj) => {
      return obj.postid !== id
    });
    newComments.push({
      postid : id,
      reply : this.state.message
    });
    this.setState({
      allComments: newComments,
      responsePresent: true,
      reply: this.state.message,
      action: "Edit Response"
    });
    req.open("PUT", "https://api.jsonbin.io/b/6119422653ca131484aa3c25", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("secret-key", "$2b$10$W5Z5x.jATbqUl7Bpw.DMTuTUGv37YB5rLfkN476XHZq5HsIE1flZK");
    req.setRequestHeader("versioning", "false");
    req.send(JSON.stringify(newComments));
  }
  startEditing() {
    this.setState({
      responsePresent: false,
      action: "Cancel Edit"
    });
  }
  cancelEdit() {
    if (this.state.action === "Leave a reply") {
      console.log("here")
      this.setState({leaveReplyPressed : true});
      return
    }
    this.setState({
      responsePresent: true,
      message: "",
      action: "Edit Response"
    });
  }
  revertWrapper() {
    this.props.revert();
  }
  render() {
    return (
      <>
      <button style={returnButtonStyle} onClick={this.revertWrapper}>Return</button>
        <ReviewSquare id={this.props.children['id']} review={this.props.children} selSquare={(k) => {console.log("todo")}} width="85%"/>
        <div style={replyBoxStyle}>
          <div style={replyBoxContentStyle}>
            {this.state.responsePresent ? <button style={editButtonStyle} onClick={this.startEditing}>{this.state.action}</button> : <button style={editButtonStyle} onClick={this.cancelEdit}>{this.state.action}</button>}
            <div style={textAreaStyle}>
              {this.state.responsePresent ? <div style={replyStyle}>{this.state.reply}</div> : (this.state.leaveReplyPressed ? <textarea id="reply" style={textInputStyle} type='text' value={this.state.message} onChange={this.handleChange} placeholder='enter comment'/> : <div>No response yet. </div>)}
            </div>
            {this.state.responsePresent ? <div/> : (this.state.leaveReplyPressed ? <button style={submitButtonStyle} onClick={this.submitComment}>submit</button> : <div/>)}
            {this.state.responsePresent ? <div style={replierNameStyle}>John Doe</div> : <div/>}
          </div>
        </div>
      </>
    )
  }
}

export default LargerReview;

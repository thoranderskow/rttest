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

const editStyle = {
  cursor: "pointer"
}

class LargerReview extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     action: "Leave a reply",
     message: "",
     reply: "",
     allComments: [],
     responsePresent: false
   }
   this.handleChange = this.handleChange.bind(this);
   this.submitComment = this.submitComment.bind(this);
   this.startEditing = this.startEditing.bind(this);
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
          this.setState({responsePresent: true})
          this.setState({action: "Edit response"})
          this.setState({reply: comment[0]['reply']})
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
    this.setState({allComments: newComments});
    this.setState({responsePresent: true});
    this.setState({reply: this.state.message});

    req.open("PUT", "https://api.jsonbin.io/b/6119422653ca131484aa3c25", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("secret-key", "$2b$10$W5Z5x.jATbqUl7Bpw.DMTuTUGv37YB5rLfkN476XHZq5HsIE1flZK");
    req.setRequestHeader("versioning", "false");
    req.send(JSON.stringify(newComments));
  }
  startEditing() {
    this.setState({responsePresent: false});
  }
  render() {
    return (
      <>
        <ReviewSquare id={this.props.children['id']} review={this.props.children} selSquare={(k) => {console.log("todo")}} width="85%"/>
        <div style={replyBoxStyle}>
          <div style={replyBoxContentStyle}>
            {this.state.responsePresent ? <a style={editStyle} onClick={this.startEditing}>{this.state.action}</a> : this.state.action}
            <div style={textAreaStyle}>
              {this.state.responsePresent ? <div>{this.state.reply}</div> : <textarea id="reply" style={textInputStyle} type='text' value={this.state.message} onChange={this.handleChange} placeholder='enter comment'/>}
            </div>
            {this.state.responsePresent ? <div/> : <button onClick={this.submitComment}>submit</button>}
          </div>
        </div>
      </>
    )
  }
}

export default LargerReview;

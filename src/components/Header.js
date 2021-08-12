import React from 'react';

const navbarStyle = {
  backgroundColor: "#285eb5",
  width: "100%",
  height: "50px",
  display: "flex",
  alignItems: "center"
}

const navbarTextStyle = {
  color: "white",
  fontFamily: '"Monaco", Times, serif',
  fontSize: "1.2em",
  marginLeft: "120px"
}

class Header extends React.Component {
  render() {
    return (
      <>
        <div style={navbarStyle}>
          <div style={navbarTextStyle}>Reviews</div>
        </div>
      </>
    )
  }
}

export default Header;

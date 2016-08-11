import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';

class NavBar extends Component {

  constructor(props,context) {
    super(props,context);
  }


  render() {

    const user = this.props.loginfo.username;

    return (
      <div className="nav_bar">
        <h2 className="web-head">
         <Link to="/" className="web-title">Good</Link>
        </h2>
        <ButtonToolbar bsClass="buttonBar">
          <Button bsStyle="primary">Sign up</Button>
          <Link to="/login" ><Button bsStyle="info">{ user == null ? "Sign in" : user }</Button></Link>
        </ButtonToolbar>
      </div>
    );
  }

}

NavBar.propTypes = {
  loginfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    loginfo: state.loginfo
  };
}

export default connect(mapStateToProps)(NavBar);



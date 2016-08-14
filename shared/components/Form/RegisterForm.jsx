import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import TextField  from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import NavBar from '../../container/Navigation/Nav';

import * as Actions from '../../redux/actions/actions';

class RegisterForm extends Component {

  constructor(props,context) {
    super(props,context);
    this.login = this.login.bind(this);
    this.state = {
      usernameHint: null,
      passwordHint: null,
      emailHint: null
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  login()  {
    var username = this.refs.username.getValue();
    var password = this.refs.password.getValue();
    var email = this.refs.email.getValue();
    const hint = "This field is required";
    if (username && password) {
      const RegisterInfo = { username: username, password: password, email: email };
      this.props.dispatch(Actions.checkinRequest(RegisterInfo));
      username = password = email = '';
    } else {
      if(!username) this.setState({ usernameHint: hint });
      if(!password) this.setState({ passwordHint: hint });
      if(!email) this.setState({ emailHint: hint });
    }
  }

  render() {

    const user = this.props.loginfo.username;

    return (
    <div>
      <NavBar />
      <div className="registerform">
        <div className="registerbar">
          {
            (!user) ? <p>No match found</p> : null
          }
         <TextField
           floatingLabelText="username" ref="username" errorText={this.state.usernameHint} />
        </div><br/>
        <div className="registerbar">
          <TextField
            floatingLabelText="password" ref="password" errorText={this.state.passwordHint} type="password" />
        </div><br/>
        <div className="registerbar">
          <TextField
            floatingLabelText="email" ref="email" errorText={this.state.emailHint}/>
        </div><br/>
        <div className="RegisterButton"><Button bsStyle="info" onClick={this.login} >Register</Button></div>
        <p>{ this.props.loginfo.password }</p>
      </div>
    </div>
    );
  }
}

RegisterForm.propTypes = {
  loginfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

LoginForm.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    registerInfo: state.registerInfo
  };
}

export default connect(mapStateToProps)(Register);

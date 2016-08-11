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

class LoginForm extends Component {

  constructor(props,context) {
    super(props,context);
    this.login = this.login.bind(this);
    this.state = {
      usernameHint: null,
      passwordHint: null
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  login()  {
    var username = this.refs.username.getValue();
    var password = this.refs.password.getValue();
    const hint = "This field is required";
    if (username && password) {
      const logInfo = { username: username, password: password };
      this.props.dispatch(Actions.checkinRequest(logInfo));
      username = password = '';
    } else {
      if(!username) this.setState({ usernameHint: hint });
      if(!password) this.setState({ passwordHint: hint });
    }
  }

  render() {


    const user = this.props.loginfo.username;
 //   if(user && user != "no such user" && user != "wrong password") browserHistory.poll();

    return (
    <div>
      <NavBar />
      <div className="loginform">
        <div className="loginbar">
          {
            (user == "no such user" || user == "wrong password") ? <p>No match found</p> : null
          }
         <TextField
           floatingLabelText="username" ref="username" errorText={this.state.usernameHint} />
        </div><br/>
        <div className="loginbar">
          <TextField
            floatingLabelText="password" ref="password" errorText={this.state.passwordHint} type="password" />
        </div><br/>
        <div className="LoginButton"><Button bsStyle="info" onClick={this.login} >Login in</Button></div>
        <p>{ this.props.loginfo.username }</p>
        <p>{ this.props.loginfo.password }</p>
      </div>
    </div>
    );
  }
}

/*  <div className="LoginButton"><RaisedButton className="logBtn" label="login" primary={true} style={style} onClick={this.login} /></div>*/

LoginForm.propTypes = {
  loginfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

LoginForm.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    loginfo: state.loginfo
  };
}

export default connect(mapStateToProps)(LoginForm);

// @flow

import React, { Component } from 'react';


function validate(email : string='', password : string='') {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0,
  };
}


class LoginForm extends React.Component {

  state : {
    email : string,
    password : string,
    everFocusedEmail: ?boolean,
    everFocusedPassword: ?boolean,
    inFocus: ?string
  };

  constructor(props: {}) {
    super();
    this.state = {
      email: '',
      password: '',

      everFocusedEmail: false,
      everFocusedPassword: false,
      inFocus: '',
    };
  }

  handleEmailChange = (evt : any) => {
    this.setState({ email: evt.target.value });
  }

  handlePasswordChange = (evt : any) => {
    this.setState({ password: evt.target.value });
  }

  handleSubmit = (evt : any) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { email, password } = this.state;
    alert(`Signed up with email: ${email} password: ${password}`);
  }

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={errors.email ? "error" : ""}
          type="text"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          className={errors.password ? "error" : ""}
          type="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <button disabled={isDisabled}>Sign up</button>
      </form>
    )
  }
}


export default LoginForm;

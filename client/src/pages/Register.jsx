import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";


class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    
    const newUser = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history); 

  };

  

  render() {
    const { errors } = this.state;
    return (
      <div className="register-form">
			<h4>
				<b>Register</b> below
			</h4>
			<p className="grey-text text-darken-1">
				Already have an account? <Link to="/login">Log in</Link>
			</p>          

            <form noValidate onSubmit={this.onSubmit}>

				<label htmlFor="fullName">Name</label><br/>
				<input
					onChange={this.onChange}
					value={this.state.fullName}
					error={errors.fullName}
					id= "fullName"
					type="text"
					className={classnames("", {
						invalid: errors.fullName
					})}
				/>
				<span className="red-text">{errors.fullName}</span> <br/>
				
				<label htmlFor="email">Email</label><br/>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <span className="red-text">{errors.email}</span><br/>              
				
				<label htmlFor="password">Password</label><br/>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                
                <span className="red-text">{errors.password}</span><br/>

			  	<label htmlFor="password2">Confirm Password</label><br/>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />                
                <span className="red-text">{errors.password2}</span><br/>              
				
                <button type="submit">
                  Sign up
                </button>
               

              </form>
        </div>    
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
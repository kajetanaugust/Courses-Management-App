// importing react
import React, { Component } from 'react';
// importing Link
import { Link } from 'react-router-dom';
// importing Form component
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign In"
                            elements={() => (
                                <React.Fragment>
                                    <input
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="email"
                                        value={emailAddress}
                                        onChange={this.change}
                                        placeholder="Email Address" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={this.change}
                                        placeholder="Password" />
                                </React.Fragment>
                            )} />
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }
    
    // change method
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    //method for submitting user
    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;

        context.actions
            .signIn(emailAddress, password) // calling signIn method
            .then( user => {
                if (user === null) { // checking if user exists
                    this.setState(()=> {
                        return {errors: [ 'Sign-in was unsuccessful! Check your credentials and try again' ]} // showing error
                    })
                } else {
                    this.props.history.push(from); // redirecting to previous page
                    console.log(`SUCCESS! ${emailAddress} is now signed in!`) // logging success to console
                }
            }).catch( err => {
            console.log(err); // logging error
            this.props.history.push('/error'); // redirecting to error page
        })
    }

    // cancel method
    cancel = () => {
        this.props.history.push('/'); // redirecting to main page
    }
}
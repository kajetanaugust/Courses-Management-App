import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        name: '',
        emailAddress: '',
        password: '',
        confirmPassword:'',
        errors: [],
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={this.change}
                                    placeholder="First Name" />
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={this.change}
                                    placeholder="Last Name" />
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
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={this.change}
                                    placeholder="Confirm Password" />
                            </React.Fragment>
                        )} />
                    <p>
                        Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                    </p>
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

    //method for submitting new user
    submit = () => {
        const {context} = this.props;

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        // checking if passwords match
        if (password === confirmPassword) {
            const user = { // if passwords match the user variable is created
                firstName,
                lastName,
                emailAddress,
                password,
            };


            context.data
                .createUser(user) // calling createUser method
                .then(errors => { // checking for errors
                    if (errors.length) {
                        this.setState({errors}) // setting errors state
                    } else {
                        console.log(`${firstName} is successfully signed up and authenticated!`); // logging succes message
                        context.actions.signIn(emailAddress, password) // passing password and email to signIn
                            .then(() => {
                                this.props.history.push('/courses'); // redirecting to main page
                            });
                    }
                }).catch(err => {
                    console.log(err);
                    this.props.history.push('/error'); // redirecting to error page
                }
            )
        } else {
            console.log('Passwords do not match!'); // logging password do not match message to console
            this.setState(() => {
                return {errors: ['Passwords do not match!']}; // returning error
            });
        }
    }

    // cancel method
    cancel = () => {
        this.props.history.push('/') // redirecting to main page
    }
}

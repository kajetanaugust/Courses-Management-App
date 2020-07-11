import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {

    // global state for authenticated user
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    };

    constructor() {
        super();
        this.data = new Data();
    }

    render() {

        const { authenticatedUser } = this.state;

        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }


    // global function handling signing in
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password); // getting user data
        if (user !== null) { // checking if there is active user return
            user.password = password;
            this.setState(() => {
                return {
                    authenticatedUser: user, //setting authenticated user
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 }); // adding user to the cookies
        }
        return user;
    }

    // global function handling signing out
    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null, //removing authenticated user from state
            };
        });
        Cookies.remove('authenticatedUser'); // removing user from the cookies
    }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}


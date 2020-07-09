import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import NotFound from './components/NotFound';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';


import withContext from './Context';

const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);

export default class App extends Component {

    render() {
        return (
            <Router>
                <div id="root">

                    <Header />

                    <hr/>

                    <Switch>
                        <Route exact path='/' render={ () => <Redirect to='/courses'/>} />
                        <Route path='/courses' component={Courses} />
                        <Route path='/courses/:id' component={CourseDetail} />
                        <Route path='/signin' component={UserSignInWithContext} />
                        <Route path='/signup' component={UserSignUpWithContext} />

                        <Route component={NotFound} />
                    </Switch>


                </div>
            </Router>
        )
    }

};

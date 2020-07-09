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
                        <Route path='/signin' component={UserSignIn} />

                        <Route component={NotFound} />
                    </Switch>


                </div>
            </Router>
        )
    }

};

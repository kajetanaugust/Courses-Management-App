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
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';


import withContext from './Context';

const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);

export default class App extends Component {

    render() {
        return (
            <Router>
                <div id="root">

                    <Header />

                    <hr/>

                    <Switch>
                        <Route exact path='/' render={ () => <Redirect to='/courses'/>} />
                        <Route exact path='/courses' component={CoursesWithContext} />
                        <Route exact path='/courses/:id' component={CourseDetailWithContext} />
                        <Route exact path='/courses/create' component={CreateCourseWithContext} />
                        <Route path='/signin' component={UserSignInWithContext} />
                        <Route path='/signup' component={UserSignUpWithContext} />
                        <Route path='/signout' component={UserSignOutWithContext} />


                        <Route path="*" component={NotFound} />
                    </Switch>


                </div>
            </Router>
        )
    }

};

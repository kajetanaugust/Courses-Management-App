import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component{

    state = {
        course: '',
        author: [],
        authUser: [],
    };

    componentDidMount() {

        const { context } = this.props;

        context.data.getCourse(this.props.match.params.id)
            .then(course => {
                if(course) {
                    this.setState({
                        course,
                        author: course.user,
                        authUser: context.authenticatedUser
                    })
                    console.log(this.state.courses)
                }

            }).catch(err => {
            console.log(err)
            this.props.history.push('/error');
        })

    }


    render() {

        const {
            course,
            author,
            authUser
        } = this.state;

        return(
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">

                            { this.Buttons() }

                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{`${this.state.course.title}`}</h3>
                            <p>`By ${this.state.course.author.firstName} ${this.state.course.author.lastName}`</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown>{this.state.course.description}</ReactMarkdown>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown>{this.state.course.materialsNeeded}</ReactMarkdown>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    Buttons = () =>{
        const courseId = this.props.match.params.id;
        const {authUser, author} = this.state;

            if(authUser){
                if(authUser.id === author.id){
                    return (
                        <span>
                            <Link className="button" to={`/courses/${courseId}/update`}>Update Course</Link>
                            <Link className="button" >Delete Course</Link>
                        </span>
                    )
                }
            }

    }

}
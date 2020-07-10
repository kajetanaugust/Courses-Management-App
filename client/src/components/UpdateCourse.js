import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

export default class CreateCourse extends Component{

    state= {
        title:'',
        author: [],
        description:'',
        estimatedTime:'',
        materialsNeeded:'',
        errors:[],
    }

    componentDidMount() {

        const { context } = this.props;

        context.data.getCourse(this.props.match.params.id)
            .then(course => {
                if(course) {
                    this.setState({
                        title:course.title,
                        author: course.User,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded,
                    })
                }

            }).catch(err => {
            console.log(err)
            this.props.history.push('/error');
        })

    }

    render() {

        const {
            errors,
            title,
            author,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input
                                                id="title"
                                                name="title"
                                                type="text"
                                                className="input-title course--title--input"
                                                placeholder="Course title..."
                                                value={title}
                                            />
                                        </div>
                                        <p>By {author.firstName} {author.lastName}</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea
                                                id="description"
                                                name="description"
                                                placeholder="Course description..."
                                                value={description}
                                            >

                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input
                                                        id="estimatedTime"
                                                        name="estimatedTime"
                                                        type="text"
                                                        className="course--time--input"
                                                        placeholder="Hours"
                                                        value={estimatedTime}
                                                    />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea
                                                        id="materialsNeeded"
                                                        name="materialsNeeded"
                                                        placeholder="List materials..."
                                                        value={materialsNeeded}
                                                    >

                                                    </textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/*<div className="grid-100 pad-bottom">*/}
                                {/*    <button className="button" type="submit">Update Course</button>*/}
                                {/*    <button className="button button-secondary"*/}
                                {/*            onClick="event.preventDefault(); location.href='course-detail.html';">Cancel*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </React.Fragment>
                            )}
                    />
                </div>
            </div>
        )
    }
    cancel = () => {
        this.props.history.push('/');
    }
}
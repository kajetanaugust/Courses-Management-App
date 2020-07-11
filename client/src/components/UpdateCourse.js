import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component{

    state= {
        title:'',
        author: [],
        description:'',
        estimatedTime:'',
        materialsNeeded:'',
        courseId:'',
        userId:'',
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
                        courseId:course.id,
                        userId:course.userId,
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
            materialsNeeded,
        } = this.state;

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Update Course"
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
                                                onChange={this.change}
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
                                                onChange={this.change}
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
                                                        onChange={this.change}
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
                                                        onChange={this.change}
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

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const emailAddress = authUser.emailAddress;
        const password = authUser.password;
        const { title , description, materialsNeeded, estimatedTime, userId, errors, courseId } = this.state;
        // console.log(password)
        const course = { title , description, materialsNeeded, estimatedTime, userId, errors, courseId };

        context.data.updateCourse(courseId, emailAddress, password, course)
            .then(errors => {
                if(errors.length) {
                    this.setState({errors});
                }else {
                    console.log(`SUCCESS! Course was successfully updated!`);
                    this.props.history.push(`/courses/${courseId}`);
                }
            }).catch( err => {
            console.log(err);
            this.props.history.push('/error');
        })

    }

    cancel = () => {
        const courseId = this.props.match.params.id;
        const { from } = this.props.location.state || { from: { pathname: `/courses/${courseId}`} };
        this.props.history.push(from);

    }
}
import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component{

    state= {
        errors:[],
        userId:'',
        lastName:'',
        firstName:'',
        title:'',
        description:'',
        estimatedTime: '',
        materialsNeeded: '',
        emailAddress:'',
        password:'',
    }


    componentDidMount() {
        const { context } = this.props;

        this.setState( () => {
            return {
                userId: context.authenticatedUser.id,
                lastName: context.authenticatedUser.lastName,
                firstName: context.authenticatedUser.firstName,
            }
            }
        )
    }

    render() {

        const {
            errors,
        } = this.state;

        return(

            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {/*<div>*/}
                    {/*    <h2 className="validation--errors--label">Validation errors</h2>*/}
                    {/*    <div className="validation-errors">*/}
                    {/*        <ul>*/}
                    {/*            <li>Please provide a value for "Title"</li>*/}
                    {/*            <li>Please provide a value for "Description"</li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
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
                                                onChange={this.change}
                                                placeholder="Course title..."
                                            />
                                        </div>
                                        <p>By {this.state.firstName} {this.state.lastName}</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea
                                                id="description"
                                                name="description"
                                                className=""
                                                onChange={this.change}
                                                placeholder="Course description...">
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
                                                        onChange={this.change}
                                                        placeholder="Hours"
                                                    /></div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea
                                                        id="materialsNeeded"
                                                        name="materialsNeeded"
                                                        onChange={this.change}
                                                        placeholder="List materials...">
                                                    </textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/*<div className="grid-100 pad-bottom">*/}
                                {/*    <button className="button" type="submit">Create Course</button>*/}
                                {/*    <button className="button button-secondary"*/}
                                {/*            onClick="event.preventDefault(); location.href='index.html';">Cancel*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                                </React.Fragment>
                            )}/>
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
        const { title , description, materialsNeeded, estimatedTime, userId, errors } = this.state;
        // console.log(password)
        const course = { title , description, materialsNeeded, estimatedTime, userId, errors };

        context.data.createCourse(emailAddress, password, course)
            .then(errors => {
                if(errors.length) {
                    this.setState({errors});
                }else {
                    console.log(`SUCCESS! Course is added!`);
                    this.props.history.push('/');
                }
            }).catch( err => {
            console.log(err);
            this.props.history.push('/error');
        })


    }

    cancel = () => {
        this.props.history.push('/');
    }
}
import config from './config'


export default class Data {

    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if ( requiresAuth ) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

            options.headers['Authorization'] = ` Basic ${encodedCredentials} `;
        }

        return fetch(url, options);
    }

    //getting the active user from the database
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) { //checking for success response
            return response.json().then(data => data);
        }
        else if (response.status === 401) { //checking for error response from API
            return null;
        }
        else {
            throw new Error(); //throwing error
        }
    }

    //adding new user to the database
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);//posting new user to database
        if (response.status === 201) { //checking for success response
            return [];
        }
        else if (response.status === 400) { //checking for error response from API
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error(); //throwing error
        }
    }

    //getting all the courses from the database
    async getCourses() {
        const response = await this.api(`/courses`, 'GET');
        if (response.status === 200) { //checking for success response
            const courses = await response.json()
                .then(data => data);
            return courses;
        }
        else if (response.status === 400) { //checking for error response from API
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error(); //throwing error
        }
    }

    //getting individual course from the database
    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET');
        if (response.status === 200) { //checking for success response
            const course = await response.json().then(data => data);
            // console.log(course);
            return course;
        }
        else if (response.status === 400) { //checking for error response from API
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error(); //throwing error
        }
    }

    //adding new course to the database
    async createCourse(emailAddress, password, course){
        const response = await this.api('/courses', 'POST', course, true, { //posting new course to database
            emailAddress,
            password
        });
        if (response.status === 201) { //checking for success response
            return [];
        } else if (response.status === 400) { //checking for error response from API
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error(); //throwing error
        }
    }

    //updating course
    async updateCourse(id, emailAddress, password, course){
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, { //put updated courses
            emailAddress,
            password
        });
        if (response.status === 204) { //checking for success response
            return [];
        } else if (response.status === 400) { //checking for error response from API
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error(); //throwing error
        }
    }

    async deleteCourse(id, emailAddress, password ) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null,true, { //deleting course
            emailAddress,
            password
        });
        if (response.status === 204) { //checking for success response
            return [];
        } else if (response.status === 403) { //checking for error response from API
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error(); //throwing error
        }
    }
}
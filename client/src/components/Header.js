import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {

    const { context } = props;
    const authUser = context.authenticatedUser;
    // console.log(authUser);

    return(
        <div className="header">
            <div className="bounds">
                <Link to='/'><h1 className="header--logo">Courses</h1></Link>
                <nav>


                    { authUser // checking if there is authenticated user
                        ?( // changing header to signout
                        <React.Fragment>
                            <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                            <Link className="signout" to="/signout">Sign Out</Link>
                        </React.Fragment>
                        )
                        :( // changing header to signin
                        <React.Fragment>
                            <Link className="signup" to="/signup">Sign Up</Link>
                            <Link className="signin" to="/signin">Sign In</Link>
                        </React.Fragment>
                        )
                    }

                </nav>
            </div>
        </div>
    )

}
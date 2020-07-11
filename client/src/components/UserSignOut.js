import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
    context.actions.signOut(); // using signOut method

    return (
        <Redirect to="/" /> // redirecting to the main page
    );
}

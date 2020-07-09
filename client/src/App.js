import React from 'react';
import './global.css';
const axios = require('axios').default;
let finalData;
axios.get('http://localhost:5000/api/courses').then(r => console.log(r.data))



function App() {


    return (
        <div className="App">
            <p>{finalData}</p>
        </div>
    );
}

export default App;

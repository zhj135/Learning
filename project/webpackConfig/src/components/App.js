import React from 'react';
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            s1: '123'
        };
    }
    render() {
        return (
            <div className="app">
                <h2>Hello, Webpack </h2>
            </div>
        );
    }
}

// IMPORT EXTERNAL LIBRARIES/MODULES
import React from 'react';
import {createBrowserHistory} from 'history';
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
// IMPORT API & ROUTE ACTIONS
import './../index.css';
import PancakeControl from './PancakeControl';

export default function App() {
    const Notfound = () => <h1> 404 Not found</h1>
    const history = createBrowserHistory();
    return (
        <Router basename="/" history={history}>
            <Switch>
                <Route exact path="/" component={PancakeControl}/>
                <Route path="*" component={Notfound}/>
            </Switch>
        </Router>
    );
}
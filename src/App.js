import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Questions from './containers/Questions/Questions';
import Results from './containers/Results/Results';


function App() {
    return (
        <Router>
            <Layout>
                    <div className="App">
                        <Route path="/" exact component={Home} />
                        <Route path="/questions" exact component={Questions} />
                        <Route path="/tracks" exact render={() => <h1>Tracks</h1>} />
                        <Route path="/results" exact component={Results} />
                    </div>
            </Layout>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {
        text: state.someTextToRemove
    }
}

export default connect(mapStateToProps)(App);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    HashRouter as Router,
    Route
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import rootReducer from './redux/index'
import './style/index.css';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider {...{store}}>
            <Router>
                <div>
                    <Route exact path='/' component={App}/>
                    <Route exact path='/:auth' component={App}/>
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
registerServiceWorker();

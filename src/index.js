import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {createBrowserHistory} from 'history';

import AppContainer from './containers/AppContainer/AppContainer';
import rootSaga from './ducks/sagas';
import rootReducer from './ducks/reducers';

import './index.scss';


const history = createBrowserHistory();
const navigationMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, navigationMiddleware))
);
const mountNode = document.getElementById('root');

sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <AppContainer history={history}/>
    </Provider>,
    mountNode
);

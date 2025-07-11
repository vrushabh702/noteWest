import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import createRootReducer from '../reducer';
import rootSaga from '../saga';
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    (window)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  createRootReducer,
  composeEnhancers(
      applyMiddleware(
        logger,
        sagaMiddleware,
      ),
    ),
  );


 sagaMiddleware.run(rootSaga);

 export default store;
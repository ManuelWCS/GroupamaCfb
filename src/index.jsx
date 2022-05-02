import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";

/* REDUX */
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import PositionReducer from './components/Reducers/PositionReducer';


// const store = configureStore( {
//   reducer : {
//     position : PositionReducer,
//   },
// } );

ReactDOM.render(
  <BrowserRouter>
  {/* <Provider store={store}>     */}
  <App />
  {/* </Provider> */}
  </BrowserRouter>,
document.getElementById('root')
);
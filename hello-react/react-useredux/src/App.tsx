import React from 'react';
import './App.css';
import Silderbar from './componments/Silderbar';
import { store } from './app/store'
import { Provider } from 'react-redux';
import Header from './componments/Header';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Header></Header>
      <Silderbar></Silderbar>
    </div>
    </Provider>
  );
}

export default App;

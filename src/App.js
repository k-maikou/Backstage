import React from 'react';
import { GlobalStyle } from './style';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      啊啊啊
    </Provider>
  );
}

export default App;

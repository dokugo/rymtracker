import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AnimationContextProvider from './contexts/animationContext';

ReactDOM.render(
  <AnimationContextProvider>
    <App />
  </AnimationContextProvider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TodoBox from './Todo';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<TodoBox />,document.getElementById('App-intro'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './components/Hello-World';
import Counter from './components/Counter';

ReactDOM.render(<HelloWorld />, document.getElementById('hello-world'));
ReactDOM.render(<Counter />, document.getElementById('counter'));
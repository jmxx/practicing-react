import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from './components/Hello-World';
import Counter from './components/Counter';
import TodoApp from './components/TodoApp';

ReactDOM.render(<HelloWorld />, document.getElementById('hello-world'));
ReactDOM.render(<Counter />, document.getElementById('counter'));
ReactDOM.render(<TodoApp />, document.getElementById('todo-app'));
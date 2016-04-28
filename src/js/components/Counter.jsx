import React from 'react';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { counter: 0 };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment () {
    this.setState({counter: this.state.counter + 1 });
  }

  decrement () {
    this.setState({counter: this.state.counter - 1 });
  }

  render() {
    return (
      <div className='hi'>
        <h1>{this.state.counter}</h1>
        <button type='button' onClick={this.increment}>Up</button>
        <button type='button' onClick={this.decrement}>Down</button>
      </div>
    );
  }
}
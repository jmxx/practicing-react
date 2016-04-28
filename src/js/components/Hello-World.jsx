import React from 'react';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: 'Hi React + ES6!' };
    this.change = this.change.bind(this);
  }

  change (ev) {
    this.setState({text: ev.target.value });
  }

  render() {
    return (
      <div className="hi">
        <h1>{this.state.text}</h1>
        <input type="text" value={this.state.text} onChange={this.change} />
      </div>
    );
  }
}
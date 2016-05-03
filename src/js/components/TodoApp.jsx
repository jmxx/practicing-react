import React from 'react';

export default class TodoApp extends React.Component {
  state = {
    items : [ 'Tarea 1', 'Tarea 2' ]
  }

  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
  }

  addItem(ev, text) {
    if (text) {
      let items = this.state.items.concat([text]);

      this.setState({ items });
    }
  }

  onDestroy(ev, i) {
    this.state.items.splice(i, 1);

    this.setState({
      items: this.state.items
    });
  }

  render() {
    return (
      <div className="hi">
        <TodoInput text={''}
                   onAdd={this.addItem}
        />
        <TodoList items={this.state.items} onDestroy={this.onDestroy} />
      </div>
    );
  }
}

class TodoInput extends React.Component {
  static propTypes = {
    onAdd: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    }

    this.change = this.change.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.click = this.click.bind(this);
  }

  change (ev) {
    this.setState({text: ev.target.value });
  }

  keyDown (ev) {
    if (ev.keyCode !== 13) {
      return;
    }

    ev.preventDefault();

    this.props.onAdd(ev, this.state.text);
    this.setState({text: ''});
  }

  click (ev) {
    this.props.onAdd(ev, this.state.text);
    this.setState({text: ''});
  }

  render() {
    return (
      <div>
        <input type="text"
               value={this.state.text}
               onChange={this.change}
               onKeyDown={this.keyDown}
        />
        <button type='button' onClick={this.click}>Add</button>
      </div>
    );
  }
}

class TodoList extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    onDestroy: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  destroy (i, ev) {
    this.props.onDestroy(ev, i);
  }

  render() {
    const renderItem = (item, i) => {
      return (
        <TodoItem key={i}
                  text={item}
                  onDestroy={this.destroy.bind(this, i)}
        />
      );
    };

    return (
      <ul className="List">
        {this.props.items.map(renderItem)}
      </ul>
    );
  }
}

class TodoItem extends React.Component {
  static propTypes = {
    onDestroy: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired
  }

  state = {
    done: false
  }

  constructor(props) {
    super(props);

    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead() {
    this.setState({
      done: !this.state.done
    })
  }

  render() {
    return (
      <li>
        <a onClick={this.markAsRead} className={this.state.done ? 'done' : ''}>
          {this.props.text}
        </a>
        <a onClick={this.props.onDestroy} className="close-btn">&times;</a>
      </li>
    );
  }
}
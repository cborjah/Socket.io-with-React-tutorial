import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client'; // Socket.io client-side javaScript.

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() { // Used over componentWillMount to avoid blocking or async issues.
    this.socket = io('/') // Triggers on connection event on the web server.
    this.socket.on('message', message => { // Event listener
      this.setState({ messages: [message, ...this.state.messages] });
    })
  }

  handleSubmit(e) {
    const body = e.target.value;
    if(e.keyCode === 13 && body) { // If enter key (keyCode === 13) was pressed and body exists...
      console.log("body: ", body)
      const message = {
        body, // ES6 syntax. This works becuase the key is the same as its value. It's equivalent to body: body
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] });
      this.socket.emit('message', body) // Sends event to listener.
      e.target.value = ''; // Empties input field.
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}><b>{message.from}:</b>{message.body}</li>
    });
    return (
      <div>
        <h1>Hello World!</h1>
        <input type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit} />
        {messages}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

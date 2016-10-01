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

  handleSubmit(e) {
    const body = e.target.value;
    if(e.keyCode === 13 && body) { // If enter key (keyCode === 13) was pressed and body exists...
      console.log("body: ", body)
      const message = {
        body: body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] });
      e.target.value = ''; // Empties input field
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

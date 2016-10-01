import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client'; // Socket.io client-side javaScript.

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

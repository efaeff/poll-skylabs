import React, { Component } from 'react';

export class Form extends Component {
  state = {
    question: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addPoll(this.state);
    this.setState({ question: '' });
  };

  handleInputChange = e => {
    const { attributes, value } = e.target;
    this.setState({ [attributes.data.value]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Poll question"
            value={this.state.question}
            data="question"
            onChange={this.handleInputChange}
          />
          <button type="submit">Create poll</button>
        </form>
      </div>
    );
  }
}

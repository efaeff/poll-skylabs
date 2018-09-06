import React, { Component } from 'react';
import nano from 'nanoid';

export class Form extends Component {
  state = {
    question: '',
    voteInput: '',
    votes: [],
  };

  handleSubmit = e => {
    e.preventDefault();

    const id = nano();

    const poll = {
      id,
      question: this.state.question,
    };

    const votes = this.state.votes.map(vote => ({ ...vote, pollId: id }));

    this.props.addPoll({ poll, votes });
    this.setState({ question: '', voteInput: '', votes: [] });
  };

  handleInputChange = e => {
    const { attributes, value } = e.target;
    this.setState({ [attributes.data.value]: value });
  };

  addVote = () => {
    if (this.state.voteInput.length > 0) {
      this.setState(state => ({
        votes: [
          ...state.votes,
          {
            id: nano(),
            name: state.voteInput,
            score: 0,
          },
        ],
        voteInput: '',
      }));
    }
  };

  removeVote = id => {
    this.setState(state => ({
      votes: state.votes.filter(vote => vote.id !== id),
    }));
  };

  render() {
    const { votes } = this.state;
    return (
      <div className="form-container">
        <div className="form">
          <input
            type="text"
            placeholder="Poll question"
            value={this.state.question}
            data="question"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Poll answer"
            value={this.state.voteInput}
            data="voteInput"
            onChange={this.handleInputChange}
          />
          <button className="btn" onClick={this.addVote}>
            Add vote
          </button>
          {votes.length > 0 &&
            votes.map(vote => (
              <span key={vote.id}>
                {vote.name}
                <button
                  className="btn"
                  onClick={e => {
                    e.preventDefault();
                    this.removeVote(vote.id);
                  }}
                >
                  X
                </button>
              </span>
            ))}
          <button className="btn" onClick={this.handleSubmit}>
            Create poll
          </button>
        </div>{' '}
      </div>
    );
  }
}

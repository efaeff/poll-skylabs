import React, { Component } from 'react';

export class Poll extends Component {
  render() {
    return (
      <li>
        <h2>{this.props.poll.question}</h2>
        <ul>
          {this.props.poll.votes.map(vote => (
            <li key={vote.id}>
              <p>{vote.score}</p>
              <button
                className="btn"
                onClick={() =>
                  this.props.increment(vote.id, this.props.poll.id)
                }
              >
                {vote.name}
              </button>
            </li>
          ))}
        </ul>
      </li>
    );
  }
}

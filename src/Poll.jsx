import React, { Component } from 'react';

export class Poll extends Component {
  render() {
    return (
      <li className="poll">
        <h2>{this.props.poll.question}</h2>
        <ul>
          {this.props.votes.map(vote => (
            <li key={vote.id}>
              <p>{vote.score}</p>
              <button
                className="btn"
                onClick={() =>
                  this.props.vote({
                    voteId: vote.id,
                    pollId: this.props.poll.id,
                  })
                }
              >
                {vote.name}
              </button>
            </li>
          ))}
          <button
            onClick={e => {
              e.preventDefault();
              this.props.removePoll(this.props.poll.id);
            }}
          >
            Remove poll
          </button>
        </ul>
      </li>
    );
  }
}

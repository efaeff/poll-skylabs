import React, { Component, Fragment } from 'react';

import { mockedData } from './mockedPolls';
import './index.css';
import { Poll } from './Poll';
import { Form } from './Form';

class App extends Component {
  state = {
    loading: false,
    polls: mockedData.polls,
    votes: mockedData.votes,
  };

  componentDidMount = () => {
    fetch('http://skygate.io/api/polls', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(data =>
        this.setState({ polls: data.polls, votes: data.votes, loading: false })
      )
      .catch(error => console.log('Request failed', error));
  };

  addPoll = ({ poll, votes }) => {
    this.setState(state => ({
      polls: [...state.polls, poll],
      votes: [...state.votes, ...votes],
    }));
    // todo API POST
  };

  removePoll = id => {
    this.setState(state => ({
      polls: state.polls.filter(poll => poll.id !== id),
      votes: state.votes.filter(vote => vote.pollId !== id),
    }));
    // todo API DELETE
  };

  vote = ({ pollId, voteId }) => {
    const votes = this.state.votes.map(
      vote =>
        vote.id === voteId && vote.pollId === pollId
          ? { ...vote, score: vote.score + 1 }
          : vote
    );

    this.setState({
      votes,
    });
    // todo API vote
  };

  render() {
    const { loading, polls } = this.state;
    return (
      <Fragment>
        <div className="container">
          <h1>Polls</h1>
          <ul>
            {loading ? (
              <img
                src="https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif"
                alt="Loading..."
              />
            ) : (
              polls.map(poll => {
                const votes = this.state.votes.filter(
                  vote => vote.pollId === poll.id
                );
                return (
                  <Poll
                    poll={poll}
                    votes={votes}
                    key={poll.id}
                    vote={this.vote}
                    removePoll={this.removePoll}
                  />
                );
              })
            )}
          </ul>

          <Form addPoll={this.addPoll} />
        </div>
      </Fragment>
    );
  }
}

export default App;

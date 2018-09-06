import React, { Component, Fragment } from 'react';

import { mockedPolls } from './mockedPolls';
import './index.css';
import { Poll } from './Poll';
import { Form } from './Form';

class App extends Component {
  state = {
    loading: false,
    polls: mockedPolls,
  };

  componentDidMount = () => {
    fetch('http://skygate.io/api/polls', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(polls => polls.json())
      .then(polls => this.setState({ polls, loading: false }))
      .catch(error => console.log('Request failed', error));
  };

  increment = (voteId, pollId) =>
    this.setState(state => {
      const poll = state.polls.find(poll => poll.id === pollId);
      const newVote = poll.votes.find(vote => vote.id === voteId);

      newVote.score++;
      poll.votes = [...poll.votes.filter(vote => vote.id !== voteId), newVote];

      return {
        polls: [...state.polls.filter(poll => poll.id !== pollId), poll],
      };
    });

  addPoll = poll => {
    this.setState(prevState => {
      const { question } = poll;

      const newPoll = {
        id: Math.floor(Math.random() * 1000000), // xD
        question,
        votes: [],
      };

      const polls = [...prevState.polls, newPoll];
      return { polls };
    });
    // POST new poll in `api/poll`
  };

  render() {
    const { loading, polls } = this.state;
    return (
      <Fragment>
        <div className="conatiner">
          <h1>Polls</h1>
          <ul>
            {loading ? (
              <img
                src="https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif"
                alt="Loading..."
              />
            ) : (
              polls
                .sort((a, b) => a.id > b.id)
                .map(poll => (
                  <Poll poll={poll} key={poll.id} increment={this.increment} />
                ))
            )}
          </ul>

          <Form addPoll={this.addPoll} />
        </div>
      </Fragment>
    );
  }
}

export default App;

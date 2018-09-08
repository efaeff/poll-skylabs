import React, { Component, Fragment } from 'react';

import { polls, votes } from './mockedPolls';
import './index.css';
import { Poll } from './Poll';
import { Form } from './Form';

class App extends Component {
  state = {
    polls,
    votes,
  };

  componentDidMount = () => {
    fetch('https://skygate.io/api/polls')
      .then(data => data.json())
      .then(results => {
        const votes = results.reduce((acc, cur) => {
          return [...cur.votes, ...acc];
        }, []);

        // const votes = [];
        // results.map(poll => {
        //   votes.push(...poll.votes);
        // });

        this.setState({ polls: results, loading: false, votes });
      })

      .catch(error => console.log('Request failed', error));
  };

  addPoll = ({ poll, votes }) => {
    fetch('https://skygate.io/api/poll', {
      method: 'POST',
      body: JSON.stringify({
        question: poll.question,
        votes: votes.map(({ name }) => ({
          name,
        })),
      }),
    })
      .then(res => res.json())
      .then(res => {
        this.setState(state => ({
          polls: [...state.polls, res],
          votes: [...state.votes, ...res.votes],
        }));
      });
  };

  removePoll = id => {
    this.setState(state => ({
      polls: state.polls.filter(poll => poll.id !== id),
      votes: state.votes.filter(vote => vote.pollId !== id),
    }));
    fetch(
      `https://cors-anywhere.herokuapp.com/https://skygate.io/api/polls/${id}`,
      {
        method: 'DELETE',
      }
    );
  };

  vote = ({ pollId, voteId }) => {
    const votes = this.state.votes.map(
      vote =>
        vote.id === voteId && vote.pollId === pollId
          ? { ...vote, score: vote.score + 1 }
          : vote
    );

    fetch(`https://skygate.io/api/polls/${pollId}/votes/${voteId}`, {
      method: 'POST',
      body: JSON.stringify({}),
    });

    this.setState({
      votes,
    });
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

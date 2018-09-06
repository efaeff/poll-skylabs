export const mockedData = {
  polls: [
    {
      id: 1,
      question: 'Do You like cats?',
    },
    {
      id: 2,
      question: 'Do You like dogs?',
      votes: [
        {
          id: 1,
          score: 0,
          name: 'Yes!',
        },
        {
          id: 2,
          score: 0,
          name: 'No!',
        },
      ],
    },
  ],
  votes: [
    {
      id: 1,
      pollId: 1,
      score: 5,
      name: 'Yes!',
    },
    {
      id: 2,
      pollId: 1,
      score: 3,
      name: 'No!',
    },
    {
      id: 3,
      pollId: 2,
      score: 12,
      name: 'Yes!',
    },
    {
      id: 4,
      pollId: 2,
      score: 1,
      name: 'No!',
    },
  ],
};

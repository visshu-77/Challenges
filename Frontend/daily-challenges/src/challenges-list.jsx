import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChallengeForm from './challengesForm.jsx';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const result = await axios.get('http://localhost:5000/api/challenges');
      setChallenges(result.data);
    };
    fetchChallenges();
  }, []);

  const markChallengeAsCompleted = (challengeId) => {
    setCompletedChallenges([...completedChallenges, challengeId]);
  };

  return (
    <div>
      <h1>Daily Challenges</h1>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <h3>{challenge.title}</h3>
            {completedChallenges.includes(challenge.id) ? (
              <p>Completed</p>
            ) : (
              <ChallengeForm
                challengeId={challenge.id}
                onComplete={() => markChallengeAsCompleted(challenge.id)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;

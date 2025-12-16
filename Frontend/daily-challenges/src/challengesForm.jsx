import React, { useState } from 'react';
import axios from 'axios';

const ChallengeForm = ({ challengeId, onComplete }) => {
  const [formData, setFormData] = useState({ answer: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`http://localhost:5000/api/challenge/${challengeId}`, formData);
      if (response.data.success) {
        onComplete();
      }
    } catch (error) {
      console.error('Error submitting challenge', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Answer the challenge:
        <input
          type="text"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ChallengeForm;

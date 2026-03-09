import React, { useState } from 'react';
import styles from '../style.module.css';

const emotionColors = {
  Happy: '#ffe066',
  Sad: '#a0c4ff',
  Angry: '#ff6b6b',
  Anxious: '#f7d794',
  Grateful: '#8fce00'
};

const EmotionButtons = ({ onColorChange }) => {
  const emotions = Object.keys(emotionColors);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [quote, setQuote] = useState('');
  const [form, setForm] = useState({
    title: '',
    reason: '',
    lessons: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const quotesMap = {
    Happy: ["Joy is a choice.", "Happiness is homemade."],
    Sad: ["It’s okay to not be okay.", "Tears are words the heart can’t express."],
    Angry: ["Feel it. Don’t fuel it.", "Speak when you’re calm, not when you’re mad."],
    Anxious: ["You’ve survived 100% of your worst days.", "Breathe. You’re okay."],
    Grateful: ["Gratitude turns what we have into enough.", "Appreciate the small things."]
  };

  const handleClick = (emotion) => {
    setSelectedEmotion(emotion);
    setSubmitted(false);
    setForm({ title: '', reason: '', lessons: '' });

    const emotionQuotes = quotesMap[emotion];
    const randomQuote = emotionQuotes[Math.floor(Math.random() * emotionQuotes.length)];
    setQuote(randomQuote);

    if (onColorChange) {
      onColorChange(emotionColors[emotion]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      emotion: selectedEmotion,
      text: quote,
      title: form.title,
      reason: form.reason,
      lessons: form.lessons
    };

    try {
      const res = await fetch(
        'https://a94dfb65-c624-4a69-be4b-6eeb5507c4cd-00-1vjj9aygk7xfy.worf.replit.dev/quotes',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry)
        }
      );

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error submitting entry:", err);
    }
  };

  return (
    <div className={styles.emotionContainer}>
      <h2 className={styles.emotionHeading}>How are you feeling?</h2>

      <div className={styles.buttonGrid}>
        {emotions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => handleClick(emotion)}
            className={styles.emotionButton}
            style={{ backgroundColor: emotionColors[emotion] }}
          >
            {emotion}
          </button>
        ))}
      </div>

      {selectedEmotion && !submitted && (
        <div className={styles.entryForm}>
          <h3>You selected: {selectedEmotion}</h3>
          <p><strong>Quote:</strong> {quote}</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.textareaGroup}>
              <textarea
                name="reason"
                placeholder="Why do you feel this way?"
                value={form.reason}
                onChange={handleChange}
                required
                className={styles.textarea}
              />
              <textarea
                name="lessons"
                placeholder="Lessons learned / What’s next?"
                value={form.lessons}
                onChange={handleChange}
                required
                className={styles.textarea}
              />
            </div>

            <input
              type="text"
              name="title"
              placeholder="Entry Title"
              value={form.title}
              onChange={handleChange}
              required
              className={styles.input}
            />

            <button
              type="submit"
              className={styles.submitButton}
              style={{ backgroundColor: emotionColors[selectedEmotion] }}
            >
              Log Entry
            </button>
          </form>
        </div>
      )}

      {submitted && (
        <div className={styles.successMessage}>
          <p>✅ Journal entry submitted successfully.</p>
        </div>
      )}
    </div>
  );
};

export default EmotionButtons;





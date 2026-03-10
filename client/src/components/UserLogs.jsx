import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import styles from '../style.module.css';

const emotionColors = {
  Happy: '#ffe066',
  Sad: '#a0c4ff',
  Angry: '#ff6b6b',
  Anxious: '#f7d794',
  Grateful: '#8fce00',
  default: '#dfe6e9',
};

const emotionLogColors = {
  Happy: '#ffc300',
  Sad: '#4d9de0',
  Angry: '#ff2e2e',
  Anxious: '#f6b93b',
  Grateful: '#7bed3f',
  default: '#cccccc',
};

const emotionEmojis = {
  Happy: '😊',
  Sad: '😢',
  Angry: '😡',
  Anxious: '😰',
  Grateful: '🙏',
  default: '💭',
};

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const API = process.env.REACT_APP_API_URL
        console.log(API);
        const response = await fetch(`${API}/quotes`);
        if (!response.ok) throw new Error('Failed to fetch logs');
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLogs(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.logContainer}>
      <h1 className={styles.logHeading}>🌍 What the World is Feeling</h1>
      <ul className={styles.logList}>
        {logs.map((log, index) => {
          const bgColor = emotionColors[log.emotion] || emotionColors.default;
          const labelColor = emotionLogColors[log.emotion] || emotionLogColors.default;
          const emoji = emotionEmojis[log.emotion] || emotionEmojis.default;
          const showFullTitle = log.title?.length > 30;

          return (
            <li
              key={index}
              className={styles.logCard}
              style={{ backgroundColor: bgColor }}
            >
              <div className={styles.logTopRow}>
                <p className={styles.logTitle} title={log.title}>
                  {emoji} <strong>{log.title || 'Untitled'}</strong>
                </p>
                <span
                  className={styles.logBadge}
                  style={{ backgroundColor: labelColor }}
                >
                  Feeling: {log.emotion || 'No feeling'}
                </span>
              </div>

              {showFullTitle && (
                <p className={styles.logFullTitle}>
                  {emoji} <strong>{log.title}</strong>
                </p>
              )}
              

              <div className={styles.logContent}>
                <p><strong>Why:</strong> {log.reason || 'No reason provided'}</p>
                <p><strong>Lesson:</strong> {log.lessons || 'No lesson recorded'}</p>
                <p className={styles.logTime}>
                  {formatDistanceToNow(new Date(log.createdAt))} ago
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LogList;







import React, { useState, useEffect } from 'react';
import EmotionButtons from './components/EmotionButtons';
import LogList from './components/UserLogs';
import MentalHealthNews from './components/NewsApi';
import './reset.css';
import styles from './style.module.css';

function App() {
  const [selectedColor, setSelectedColor] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [showLogs, setShowLogs] = useState(true); // default to logs view

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleView = () => setShowLogs((prev) => !prev);

  return (
    <div className={styles.app}>
      {isMobile && (
        <button className={styles.floatingToggle} onClick={toggleView}>
          {showLogs ? '🧠 Add Entry' : '📋 View Logs'}
        </button>
      )}

      {/* LOGS */}
      <div
        className={`${styles.logsDiv} ${isMobile && !showLogs ? styles.hidden : ''}`}
      >
        <h1 className={styles.logoHeader}>
          🧠 inTouch <span className={styles.logoSubheader}>—-----------</span>
        </h1>
        <LogList />
      </div>

      {/* FORM + NEWS */}
      <div
        className={`${styles.newsFormDiv} ${isMobile && showLogs ? styles.hidden : ''}`}
      >
        <div
          className={styles.formDiv}
          style={{ backgroundColor: selectedColor }}
        >
          <EmotionButtons onColorChange={setSelectedColor} />
        </div>
        <div className={styles.newsDiv}>
          <MentalHealthNews />
        </div>
      </div>
    </div>
  );
}

export default App;








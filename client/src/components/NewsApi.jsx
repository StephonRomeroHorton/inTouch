import React, { useState, useEffect } from 'react';
import styles from '../style.module.css';

const MentalHealthNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cachedData = localStorage.getItem('mentalHealthNews');

        if (cachedData) {
          const parsedCache = JSON.parse(cachedData);
          const isFresh = Date.now() - parsedCache.timestamp < 1000 * 60 * 60; // 1 hour

          if (isFresh) {
            setNews(parsedCache.articles);
            setLoading(false);
            return;
          }
        }

        const response = await fetch(
          'https://api.allorigins.win/get?url=' +
            encodeURIComponent(
              'https://newsapi.org/v2/everything?q=mental+health&apiKey=20d155d3c1df4d5db1e994fb7ca49cd7'
            )
        );

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        const parsedData = JSON.parse(data.contents);

        // Sort by most recent
        const sorted = parsedData.articles.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        // Cache with timestamp
        const cacheObject = {
          articles: sorted,
          timestamp: Date.now()
        };

        localStorage.setItem('mentalHealthNews', JSON.stringify(cacheObject));
        setNews(sorted);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading mental health news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.newsContainer}>
      <h2 className={styles.newsHeading}>Mental Health News</h2>
      <div className={styles.newsDiv}>
        {Array.isArray(news) && news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className={styles.articleCard}>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className={styles.articleImage}
                />
              )}
              <div className={styles.articleContent}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                {article.author && (
                  <p className={styles.articleAuthor}>
                    <strong>By:</strong> {article.author}
                  </p>
                )}
                <p className={styles.articleDescription}>{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.articleLink}
                >
                  Read more
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No news available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default MentalHealthNews;




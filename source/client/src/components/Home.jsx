import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Home.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const indicator = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <div>
      {/* Star Sky */}
      <div className={styles.starSky}>
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
        <div className={styles.stars3}></div>
      </div>

      {/* Spinner */}
      {isLoading && (
        <div className={styles.spinner}>
          <Spin indicator={indicator} />
        </div>
      )}

      {/* Nội dung Home khi không còn loading */}
      {!isLoading && (
        <div className={styles.content}>
          <h1>Welcome to ChatApp</h1>
          <p>Explore the stars while chatting!</p>
        </div>
      )}
    </div>
  );
}
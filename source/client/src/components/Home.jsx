import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Home.module.css';
import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';
import user3 from '../assets/user3.jpg';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const indicator = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <div className={styles.homeContainer}>
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
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <h1>Welcome to ChatApp</h1>
          <p>Developed by the members of the "mid-project-207412687" project from our class</p>
        </div>
        <div className={styles.memberSection}>
          <div className={styles.memberCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <img src={user1} alt="Member 1" />
                <h3>Đăng</h3>
              </div>
              <div className={styles.cardBack}>
                <h3>Hải Đăng</h3>
                <p>Backend Developer</p>
                <p>B22DCCN207</p>
              </div>
            </div>
          </div>

          <div className={styles.memberCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <img src={user2} alt="Member 2" />
                <h3>Hưng</h3>
              </div>
              <div className={styles.cardBack}>
                <h3>Nguyễn Hữu Hưng</h3>
                <p>Backend Developer</p>
                <p>B22DCCN412</p>
              </div>
            </div>
          </div>

          <div className={styles.memberCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <img src={user3} alt="Member 3" />
                <h3>Sơn</h3>
              </div>
              <div className={styles.cardBack}>
                <h3>Bùi Hoàng Sơn</h3>
                <p>Frontend Developer</p>
                <p>B22DCCN687</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Footer */}
      {!isLoading && (
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <a href="https://github.com/jnp2018/mid-project-207412687" target="_blank" rel="noopener noreferrer">
              GitHub Project
            </a>
          </div>
          <div className={styles.footerRight}>
            ChatApp © 2025
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./Options.module.css";

export default function Options() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const indicator = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  const handleNavigate = (type, roomId) => {
    navigate(`/chat/${type}/${roomId}`);
  };

  return (
    <div className={styles.optionsContainer}>
      {/* Nền sao */}
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

      {/* Nội dung chính */}
      {!isLoading && (
        <>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>Chọn kiểu chat</h1>
            <p className={styles.subtitle}>Hãy chọn cách bạn muốn trò chuyện</p>

            <div className={styles.optionsGrid}>
              {/* Chat 1-1 */}
              <div
                className={`${styles.optionCard} ${styles.chat1to1}`}
                onClick={() => handleNavigate("1-1", "room1")} // "room1" có thể thay bằng user cụ thể
              >
                <span className={styles.optionTitle}>Chat 1-1</span>
                <span className={styles.optionTooltip}>Nói chuyện với cá nhân</span>
              </div>

              {/* Chat nhóm */}
              <div
                className={`${styles.optionCard} ${styles.chatGroup}`}
                onClick={() => handleNavigate("group", "group1")} // "group1" là ID nhóm
              >
                <span className={styles.optionTitle}>Chat nhóm</span>
                <span className={styles.optionTooltip}>Thảo luận với nhiều người</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <div>
              <a
                href="https://github.com/jnp2018/mid-project-207412687"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Project
              </a>
            </div>
            <div>ChatApp © 2025</div>
          </footer>
        </>
      )}
    </div>
  );
}
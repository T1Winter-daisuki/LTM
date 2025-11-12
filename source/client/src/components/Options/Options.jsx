// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Options.module.css";

// export default function Options({ user }) {
//   const navigate = useNavigate();

//   return (
//     <div className={styles.optionsContainer}>
//       <h2 className={styles.title}>Chọn kiểu chat</h2>
//       <div className={styles.optionsGrid}>
//         <div
//           className={`${styles.optionCard} ${styles.chat1to1}`}
//           onClick={() => navigate("/chat/1-1")}
//         >
//           <span className={styles.optionTitle}>Chat 1-1</span>
//           <span className={styles.optionTooltip}>Nói chuyện với cá nhân</span>
//         </div>

//         <div
//           className={`${styles.optionCard} ${styles.chatGroup}`}
//           onClick={() => navigate("/chat/group")}
//         >
//           <span className={styles.optionTitle}>Chat nhóm</span>
//           <span className={styles.optionTooltip}>Thảo luận nhóm nhiều người</span>
//         </div>
//       </div>
//     </div>
//   );
// }
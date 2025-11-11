import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Card, Modal, message as antMessage } from "antd";
import { SendOutlined, PaperClipOutlined, FileOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./ChatSpace.module.css";

const ChatSpace = ({ user }) => {
  if (!user) return <p>Loading...</p>;

  const [messages, setMessages] = useState([]);
  const [messagesOffline, setMessagesOffline] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [listUsers, setListUsers] = useState([]);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [fileInput, setFileInput] = useState(null);

  const socketRef = useRef(null);
  const fileSocketRef = useRef(null);

  // const fakeUsers = [
  //   { username: "Bob", status: "offline" },
  //   { username: "Charlie", status: "online" },
  // ];

  // const fakeMessages = [
  //   { username: "Bob", type: "text", content: "Hello Alice!" },
  //   { username: "Charlie", type: "text", content: "Chào cả nhà" },
  //   { username: "Alice", type: "file", message: "document.pdf" },
  // ];

  useEffect(() => {
    if (!user) return <p>Loading...</p>;

    socketRef.current = new WebSocket(`ws://localhost:8000/ws/${user?.username}`);
    fileSocketRef.current = new WebSocket(`ws://localhost:8000/ws/file/${user?.username}`);

    axios.get("http://localhost:8000/message/get_all").then((res) => {
      setMessages(res.data.map((msg) => ({
        username: msg.username,
        message: msg.message,
        type: msg.type
      })));
    });

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, { username: data.username, message: data.message, type: data.type }]);
    };
    fileSocketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, { username: data.username, message: data.message, type: data.type }]);
    };

    const fetchUsers = () => {
      axios.get("http://127.0.0.1:8000/api/user/get_all").then((res) => setListUsers(res.data));
    };
    fetchUsers();
    const interval = setInterval(fetchUsers, 2000);

    const handleOnline = () => {
      setIsOnline(true);
      syncMessages();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      socketRef.current?.close();
      fileSocketRef.current?.close();
    };
  }, [user?.username]);

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const messageData = { type: "text", content: currentMessage };
    setCurrentMessage("");

    if (!isOnline) {
      setMessagesOffline((prev) => [...prev, messageData]);
      return;
    }

    socketRef.current?.send(JSON.stringify(messageData));
  };

  const syncMessages = () => {
    messagesOffline.forEach((msg) => {
      if (msg.type === "text") socketRef.current?.send(JSON.stringify(msg));
      else if (msg.type === "file") fileSocketRef.current?.send(JSON.stringify(msg));
    });
    setMessagesOffline([]);
  };

  const sendFile = (file) => {
    if (!file) return;

    if (!fileSocketRef.current || fileSocketRef.current.readyState !== 1) {
      antMessage.error("WebSocket chưa kết nối");
      return;
    }

    let offset = 0;
    const chunkSize = 1024 * 1024;

    // Hiển thị file đang gửi
    setMessages(prev => [...prev, { username: user.username, message: file.name, type: "file_progress" }]);
    const hide = antMessage.loading({ content: `Đang gửi ${file.name}`, duration: 0 });

    const sendChunk = () => {
      if (offset >= file.size) {
        hide();
        antMessage.success(`Gửi ${file.name} xong`, 2.5);
        return;
      }

      const end = Math.min(offset + chunkSize, file.size);
      const reader = new FileReader();

      reader.onload = () => {
        try {
          fileSocketRef.current.send(JSON.stringify({
            type: "file",
            name: file.name,
            offset,
            content: reader.result,
            totalSize: file.size
          }));
          offset += chunkSize;
          sendChunk();
        } catch (err) {
          hide();
          antMessage.error("Gửi file lỗi");
        }
      };

      reader.onerror = () => {
        hide();
        antMessage.error("Gửi file lỗi");
      };

      reader.readAsDataURL(file.slice(offset, end));
    };

    sendChunk();
  };

  const handleFileInput = () => {
    if (!fileInput) return;
    sendFile(fileInput);
    setFileModalOpen(false);
    setFileInput(null);
  };


  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesOffline]);

  // const [activeChatUser, setActiveChatUser] = useState(null);

  const handleFileChange = (e) => setFileInput(e.target.files[0]);

  return (
    <div className={styles.superContainer}>
      {/* User Status */}
      <div className={styles.userStatusBar}>
        {listUsers.map(u => (
          <div key={u.username} className={styles.userList}>
            <div className={styles.user}>
              <div className={styles.infor}>
                <span className={styles.usernameStatus}>{u?.username}</span>
                <span className={`${styles.status} ${styles[u?.status]}`}></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Space */}
      <div className={styles.chatSpaceContainer}>
        <div style={{ paddingBottom: 100, overflowY: "auto", flex: 1 }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`${styles.messageContainer} ${msg.username === user.username ? styles.myMessage : styles.yourMessage}`}
            >
              {msg.username !== user.username && (
                <div className={styles.usernameContainer}>
                  <p className={styles.username}>{msg.username}:</p>
                </div>
              )}
              {msg.type === "text" ? (
                <p className={styles.message}>{msg.message || msg.content}</p>
              ) : (
                <p className={styles.message}>
                  <a
                    href={`http://127.0.0.1:8000/message/file/${msg.message}`}
                    className={`${styles.yourFile} ${msg.username === user.username ? styles.myFile : ""}`}
                  >
                    <FileOutlined /> {msg.message}
                  </a>
                </p>
              )}
            </div>
          ))}
          {messagesOffline.filter(item => item.type !== "file").map((msg, idx) => (
            <div key={idx} className={`${styles.messageContainer} ${styles.myMessage}`}>
              <p className={styles.message}>{msg.content}</p>
              <p className={styles.sendingLabel}>Đang gửi</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <Card className={styles.chatCard}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              type="text"
              style={{ borderRadius: 30 }}
              icon={<PaperClipOutlined style={{ fontSize: 24 }} />}
              onClick={() => setFileModalOpen(true)}
            />
            <Modal title="Gửi file" open={fileModalOpen} onOk={handleFileInput} onCancel={() => setFileModalOpen(false)}>
              <input type="file" onChange={handleFileChange} />
            </Modal>

            <Input.TextArea
              placeholder="Nhập tin nhắn"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              className={styles.chatInput}
              autoSize={{ minRows: 1, maxRows: 4 }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button icon={<SendOutlined />} onClick={sendMessage} style={{ marginLeft: 5, borderRadius: 30 }} />
          </div>
        </Card>
      </div>

    </div>
  );
};

export default ChatSpace;
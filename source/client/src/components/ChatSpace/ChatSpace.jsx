import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Card, Modal, message as antMessage } from "antd";
import { SendOutlined, PaperClipOutlined, FileOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./ChatSpace.module.css";
import { useParams, useNavigate } from "react-router-dom";

const ChatSpace = ({ user, type }) => {
  const [messages, setMessages] = useState([]);
  const [messagesOffline, setMessagesOffline] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [listGroupUsers, setListGroupUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [fileInput, setFileInput] = useState(null);
  const [wsOpen, setWsOpen] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { roomId: paramRoomId } = useParams();
  const navigate = useNavigate();

  const roomId = type === "1-1"
    ? selectedUser ? [user.username, selectedUser.username].sort().join("_") : null
    : paramRoomId;

  // --- Khởi tạo selectedUser ---
  useEffect(() => {
    if (type !== "1-1") return;
    let u = JSON.parse(localStorage.getItem("chat_selected_user") || "null");
    if (!u && paramRoomId) {
      const other = paramRoomId.split("_").find(x => x !== user.username);
      if (other) u = { username: other };
    }
    if (u) {
      setSelectedUser(u);
      localStorage.setItem("chat_selected_user", JSON.stringify(u));
    } else if (paramRoomId) navigate("/options");
  }, [paramRoomId, type, user.username, navigate]);

  // --- Lấy danh sách users 1-1 ---
  useEffect(() => {
    if (type !== "1-1" || !user?.username) return;
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/user/get_all");
        setListUsers(res.data.filter(u => u.username !== user.username));
      } catch {}
    };
    fetchUsers();
    const interval = setInterval(fetchUsers, 2000);
    return () => clearInterval(interval);
  }, [type, user?.username]);

  // --- Lấy danh sách group ---
  useEffect(() => {
    if (type !== "group" || !paramRoomId) return;
    axios.get(`http://127.0.0.1:8000/api/group/${paramRoomId}/users`)
      .then(res => setListGroupUsers(res.data.users || []))
      .catch(() => {});
  }, [type, paramRoomId]);

  // --- Load tin nhắn cũ ---
  useEffect(() => {
    if (!roomId) return;
    axios.get(`http://localhost:8000/message/get_all/${roomId}`)
      .then(res => setMessages(res.data.map(msg => ({
        username: msg.username || msg.sender || "unknown",
        message: msg.message || msg.content || "",
        type: msg.type || "text",
        name: msg.name
      }))))
      .catch(err => console.error("Lấy tin nhắn thất bại", err));
  }, [roomId]);

  // --- WS TEXT + FILE ---
  useEffect(() => {
    if (!user?.username || !roomId) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/${roomId}/${user.username}`);
    socketRef.current = ws;

    ws.onopen = () => setWsOpen(true);
    ws.onclose = () => setWsOpen(false);
    ws.onerror = e => console.error("WS error", e);
    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      setMessages(prev => [...prev, data]);
    };

    const handleOnline = () => {
      setIsOnline(true);
      messagesOffline.forEach(m => {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(m));
      });
      setMessagesOffline([]);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      ws.close();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [user?.username, roomId, messagesOffline]);

  // --- Gửi message text ---
  const sendMessage = async () => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      antMessage.error("WebSocket chưa kết nối!");
      return;
    }
    if (!currentMessage.trim()) return;

    const msg = { username: user.username, message: currentMessage, type: "text" };
    setCurrentMessage("");
    if (!isOnline) {
      setMessagesOffline(prev => [...prev, msg]);
      return;
    }

    socketRef.current.send(JSON.stringify(msg));
    try { await axios.post(`http://localhost:8000/message/save/${roomId}`, msg); } 
    catch { antMessage.error("Lưu tin nhắn thất bại"); }
  };

  // --- Gửi file chunk ---
  const sendFile = (file) => {
    if (!wsOpen) { antMessage.error("WebSocket chưa kết nối!"); return; }

    const chunkSize = 1024 * 1024; // 1MB
    let offset = 0;
    const hide = antMessage.loading(`Đang gửi: ${file.name}`, 0);

    const sendChunk = () => {
      if (offset >= file.size) { hide(); antMessage.success(`Gửi xong: ${file.name}`); return; }
      const end = Math.min(offset + chunkSize, file.size);
      const reader = new FileReader();
      reader.onload = () => {
        socketRef.current.send(JSON.stringify({
          type: "file",
          name: file.name,
          offset,
          content: reader.result,
          totalSize: file.size
        }));
        offset += chunkSize;
        setTimeout(sendChunk, 10); // delay nhỏ để WS không bị nghẽn
      };
      reader.onerror = () => { hide(); antMessage.error("Đọc file lỗi"); };
      reader.readAsDataURL(file.slice(offset, end));
    };
    sendChunk();
  };

  const handleSelectFile = () => { if(fileInput) sendFile(fileInput); setFileModalOpen(false); setFileInput(null); };

  // Scroll cuối
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSelectUser = (u) => { setSelectedUser(u); localStorage.setItem("chat_selected_user", JSON.stringify(u)); };

  return (
    <div className={styles.superContainer}>
      <div className={styles.sidebar}>
        {type === "1-1" && listUsers.map(u => (
          <div key={u.username} className={`${styles.userItem} ${selectedUser?.username === u.username ? styles.userActive : ""}`} onClick={() => handleSelectUser(u)}>
            <span>{u.username}</span>
            <span className={`${styles.status} ${styles[u.status]}`}></span>
          </div>
        ))}
        {type === "group" && listGroupUsers.map(u => (
          <div key={u} className={styles.userItem}><span>{u}</span></div>
        ))}
      </div>

      <div className={styles.chatArea}>
        {!roomId ? <div className={styles.emptyArea}><p>Hãy chọn người để bắt đầu chat</p></div> : (
          <>
            <div className={styles.messagesBox}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.messageContainer} ${msg.username === user.username ? styles.myMessage : styles.yourMessage}`}>
                  {msg.username !== user.username && <p className={styles.username}>{msg.username}:</p>}
                  {msg.type === "text" && <p className={styles.message}>{msg.message}</p>}
                  {msg.type === "file" && (
                    <p className={styles.message}>
                      <FileOutlined /> <a href={`http://127.0.0.1:8000/message/file/${msg.name || msg.message}`} target="_blank" rel="noopener noreferrer">{msg.name || msg.message}</a>
                    </p>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <Card className={styles.chatCard}>
              <div style={{ display: "flex", gap: 10 }}>
                <Button type="text" icon={<PaperClipOutlined style={{ fontSize: 22 }} />} onClick={() => setFileModalOpen(true)} />
                <Modal title="Gửi file" open={fileModalOpen} onOk={handleSelectFile} onCancel={() => setFileModalOpen(false)}>
                  <input type="file" onChange={(e) => setFileInput(e.target.files[0])} />
                </Modal>
                <Input.TextArea placeholder="Nhập tin nhắn..." value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} autoSize={{minRows:1,maxRows:3}}
                  onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}} />
                <Button icon={<SendOutlined />} onClick={sendMessage} />
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSpace;
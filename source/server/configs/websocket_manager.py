from typing import Dict, List
from fastapi import WebSocket

# -------------------------
# Chat history tạm memory
# -------------------------
chat_history: Dict[str, List[dict]] = {}  # lưu message dạng dict: {"username":..., "message":..., "type":...}

# -------------------------
# Connection Manager
# -------------------------
class ConnectionManager:
    def __init__(self):
        # key = roomId, value = list of websockets
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.active_connections:
            self.active_connections[room] = []
        self.active_connections[room].append(websocket)
        if room not in chat_history:
            chat_history[room] = []
        print(f"[WS] Connected {len(self.active_connections[room])} in room {room}")

    def disconnect(self, websocket: WebSocket, room: str):
        if room in self.active_connections and websocket in self.active_connections[room]:
            self.active_connections[room].remove(websocket)
            print(f"[WS] Disconnected {len(self.active_connections[room])} left in room {room}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, room: str):
        for conn in self.active_connections.get(room, []):
            await conn.send_text(message)
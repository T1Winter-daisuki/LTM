# -*- coding: utf-8 -*-
import base64
import json
import asyncio
import os
from datetime import datetime

from fastapi import FastAPI, WebSocket
from routers.authentication import router as AuthRouter
from routers.user_router import router as UserRouter
from routers.message_router import router as MessageRouter
from starlette.middleware.cors import CORSMiddleware
from configs.websocket_manager import ConnectionManager, chat_history
from starlette.websockets import WebSocketDisconnect
from configs.database import message_collection, user_collection, group_collection
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.include_router(UserRouter)
app.include_router(AuthRouter)
app.include_router(MessageRouter)

# ----------------------
# Managers
# ----------------------
manager = ConnectionManager()       # text messages
file_manager = ConnectionManager()  # file messages

# ----------------------
# DB helper
# ----------------------
async def insert_into_database(username, message, type, room):
    message_collection.insert_one({
        "room": room,
        "username": username,
        "message": message,
        "type": type,
        "timestamp": datetime.now()
    })

# ----------------------
# WebSocket endpoints
# ----------------------

# --- Text chat ---
@app.websocket("/ws/{roomId}/{username}")
async def websocket_endpoint(websocket: WebSocket, roomId: str, username: str):
    await manager.connect(websocket, roomId)
    user_collection.update_one({'username': username}, {'$set': {'status': 'online'}})
    user_collection.update_one({'username': username},
                               {'$set': {'last_sent': datetime.now().timestamp() * 1000}})
    try:
        while True:
            data = await websocket.receive_text()
            parsed_data = json.loads(data)

            message_content = parsed_data.get('content', parsed_data.get('message', ''))

            # Lưu vào chat_history
            if roomId not in chat_history:
                chat_history[roomId] = []
            chat_history[roomId].append({
                "username": username,
                "message": message_content,
                "type": "text"
            })

            # Broadcast
            msg_to_send = json.dumps({
                "username": username,
                "message": message_content,
                "type": "text"
            }, ensure_ascii=False)
            await manager.broadcast(msg_to_send, roomId)

            # DB
            asyncio.create_task(insert_into_database(username, message_content, "text"))

            # Update user status
            user_collection.update_one({'username': username},
                                       {'$set': {'last_sent': datetime.now().timestamp() * 1000}})
            user_collection.update_one({'username': username}, {'$set': {'status': 'online'}})

    except WebSocketDisconnect:
        manager.disconnect(websocket, roomId)
        user_collection.update_one({'username': username}, {'$set': {'status': 'offline'}})

# --- File chat ---
@app.websocket("/ws/file/{roomId}/{username}")
async def websocket_file_endpoint(websocket: WebSocket, roomId: str, username: str):
    await file_manager.connect(websocket, roomId)
    user_collection.update_one({'username': username}, {'$set': {'status': 'online'}})
    user_collection.update_one({'username': username},
                               {'$set': {'last_sent': datetime.now().timestamp() * 1000}})
    try:
        while True:
            data = await websocket.receive_text()
            parsed_data = json.loads(data)

            file_name = parsed_data['name']
            file_content = parsed_data['content']
            offset = parsed_data['offset']
            file_path = f"files/{file_name}"
            mode = 'ab' if offset > 0 else 'wb'

            # Ghi file
            with open(file_path, mode) as f:
                f.write(base64.b64decode(file_content.split(',')[1]))

            file_size = os.path.getsize(file_path)
            if file_size == parsed_data['totalSize']:
                file_msg = json.dumps({
                    "username": username,
                    "message": file_name,
                    "type": "file"
                }, ensure_ascii=False)

                # Broadcast cho roomId
                await file_manager.broadcast(file_msg, roomId)
                await manager.broadcast(file_msg, roomId)

                # DB
                asyncio.create_task(insert_into_database(username, file_name, "file"))

                # Update user status
                user_collection.update_one({'username': username},
                                           {'$set': {'last_sent': datetime.now().timestamp() * 1000}})
                user_collection.update_one({'username': username}, {'$set': {'status': 'online'}})

    except WebSocketDisconnect:
        file_manager.disconnect(websocket, roomId)

# ----------------------
# Middleware
# ----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount folder 'files' để FE có thể download
app.mount("/message/file", StaticFiles(directory="files"), name="files")

@app.get("/api/group/{group_id}/users")
def get_group_users(group_id: str):
    group = group_collection.find_one({"group_id": group_id}, {"_id": 0})
    if not group:
        return {"error": "Group not found"}
    return {"users": group.get("users", [])}
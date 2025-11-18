# -*- coding: utf-8 -*-
import json
import os
import base64
import asyncio
from datetime import datetime

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from configs.websocket_manager import ConnectionManager, chat_history
from configs.database import message_collection

router = APIRouter(
    prefix="/message",
    tags=["Message"]
)

manager = ConnectionManager()
file_manager = ConnectionManager()

async def insert_into_database(username, message, type, room):
    message_collection.insert_one({
        "room": room,
        "username": username,
        "message": message,
        "type": type,
        "timestamp": datetime.now()
    })

@router.websocket("/ws/{room}/{username}")
async def websocket_endpoint(websocket: WebSocket, room: str, username: str):
    await manager.connect(websocket, room)
    try:
        while True:
            data = await websocket.receive_text()
            parsed_data = json.loads(data)

            chat_history[room].append(parsed_data)

            await manager.broadcast(data, room)

            asyncio.create_task(
                insert_into_database(username, parsed_data["message"], parsed_data["type"], room)
            )
    except WebSocketDisconnect:
        manager.disconnect(websocket, room)

@router.websocket("/ws/file/{room}/{username}")
async def websocket_file_endpoint(websocket: WebSocket, room: str, username: str):
    await file_manager.connect(websocket, room)
    try:
        while True:
            data = await websocket.receive_text()
            parsed_data = json.loads(data)

            file_name = parsed_data['name']
            file_content = parsed_data['content']
            offset = parsed_data['offset']
            file_path = os.path.join("files", file_name)
            mode = 'ab' if offset > 0 else 'wb'

            with open(file_path, mode) as f:
                f.write(base64.b64decode(file_content.split(',')[1]))

            # Nếu gửi xong file, broadcast và lưu DB
            file_size = os.path.getsize(file_path)
            if file_size == parsed_data['totalSize']:
                msg_obj = {
                    "username": username,
                    "message": file_name,
                    "type": "file"
                }
                chat_history[room].append(msg_obj)
                await file_manager.broadcast(json.dumps(msg_obj, ensure_ascii=False), room)
                await manager.broadcast(json.dumps(msg_obj, ensure_ascii=False), room)
                asyncio.create_task(insert_into_database(username, file_name, "file", room))

    except WebSocketDisconnect:
        file_manager.disconnect(websocket, room)

@router.get("/get_all/{room}")
def get_all_messages(room: str):
    return chat_history.get(room, [])

@router.get('/file/{file_name}')
def get_file(file_name: str):
    file_path = os.path.join("files", file_name)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "File not found"}

@router.post("/save/{room}")
def save_message(room: str, msg: dict):
    message_collection.insert_one({
        "room": room,
        "username": msg["username"],
        "message": msg["message"],
        "type": msg["type"],
        "timestamp": datetime.now()
    })
    return {"success": True}
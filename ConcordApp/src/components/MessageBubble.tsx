import {Message} from "@/lib/models";
import React, {useState} from "react";
import {UpdateMessageDto} from "@/lib/dtos";

interface Props {
    message: Message;
    isMe: boolean;
    onEditSubmit: (updateMessageDto: UpdateMessageDto) => void;
    onDelete: (message: Message) => void;
}

export function MessageBubble({ message, isMe, onEditSubmit, onDelete }: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingMessage, setEditingMessage] = useState<string>(message.text);

    return (
        <>
            <div key={message.id} className={`chat chat-${isMe ? 'end' : 'start'}`}>
                <div className="chat-header text-neutral-900">
                    {message.sender}
                    <time className="text-xs opacity-50 text-neutral-700">{`${(new Date(message.createdAt)).getHours()}:${(new Date(message.createdAt)).getMinutes()}`}</time>
                </div>
                <div
                    className={`chat-bubble ${isMe ? "chat-bubble-primary" : ""}`}>
                    {isEditing ? (
                        <>
                            <input type="text" placeholder="Type here" value={editingMessage} onChange={(e) => setEditingMessage(e.target.value)} className="input input-ghost w-full max-w-xs" />
                            <span className={"cursor-pointer underline"} onClick={(e) => {
                                onEditSubmit(new UpdateMessageDto({
                                    id: message.id,
                                    text: editingMessage
                                }));
                                setIsEditing(false);
                            }}>save</span>
                            <span> - </span>
                            <span className={"cursor-pointer underline"} onClick={() => {
                                setIsEditing(false);
                                setEditingMessage(message.text);
                            }}>cancel</span>
                        </>
                    ) : message.text}
                </div>
                <div className="chat-footer text-neutral-700 opacity-50">
                    <span className={"cursor-pointer underline"} onClick={(e) => setIsEditing(true)}>edit</span>
                    <span> - </span>
                    <span className={"cursor-pointer underline"} onClick={(e) => onDelete(message)}>remove</span>
                </div>
            </div>
        </>
    );
}

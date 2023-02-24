import {Channel} from "@/lib/models";
import React, {Ref, useContext, useEffect, useRef} from "react";
import {MessageBubble} from "@/components/MessageBubble";
import {HandlersContext} from "@/lib/contexts";

interface Props {
    channels: Record<number, Channel>;
    selectedChannelId: number;
    senderName: string;
}

export function ChatRoomContent({channels, selectedChannelId, senderName}: Props) {
    const { editMessageHandler, handleDeleteMessage } = useContext(HandlersContext);

    const chatRoomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("scroll to bottom", chatRoomRef.current)
        if (chatRoomRef.current) {
            chatRoomRef.current.scrollIntoView({behavior: "smooth"});
            chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight ?? 0;
        }
    }, [selectedChannelId, channels]);

    return (
        <div ref={chatRoomRef}
             className={"flex flex-col flex-1 rounded-lg bg-slate-200 h-fit w-full p-3 bg-slate-300 mt-2 overflow-y-auto"}>
            {
                (selectedChannelId === -1 || channels[selectedChannelId]?.messages.length < 1) ? (
                    <p className={"text-2xl mx-auto text-center justify-self-center self-center"}>No
                        messages</p>
                ) : channels[selectedChannelId].messages.map(message => (
                    <MessageBubble message={message} isMe={message.sender === senderName} onEditSubmit={editMessageHandler} onDelete={handleDeleteMessage}/>
                ))
            }
        </div>
    );
}

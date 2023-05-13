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
        console.log("scroll to bottom", chatRoomRef.current, channels)
        if (chatRoomRef.current) {
            chatRoomRef.current.scrollIntoView({behavior: "smooth"});
            chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight ?? 0;
        }
    }, [selectedChannelId, channels]);

    const renderMessages = () => {
        if (selectedChannelId === -1) {
            if (Object.keys(channels).length === 0) {
                return (
                    <p className={"text-2xl mx-auto text-center justify-self-center self-center"}>Be the first one who makes a channel ✨</p>
                );
            } else {
                return (
                    <p className={"text-2xl mx-auto text-center justify-self-center self-center"}>Please choose a channel or make a new one ✨</p>
                );
            }
        }

        if (channels[selectedChannelId]?.messages.length < 1) {
            return (
                <p className={"text-2xl mx-auto text-center justify-self-center self-center"}>No messages. Be the first one! ✨</p>
            );
        }

        // sort messages by date
        channels[selectedChannelId].messages.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });

        return channels[selectedChannelId].messages.map(message => (
            <MessageBubble message={message} isMe={message.sender === senderName} onEditSubmit={editMessageHandler} onDelete={handleDeleteMessage}/>
        ));
    };

    return (
        <div ref={chatRoomRef}
             className={"flex flex-col rounded-lg bg-slate-200 w-full p-3 bg-slate-300 mt-2"}>
            {renderMessages()}
        </div>
    );
}

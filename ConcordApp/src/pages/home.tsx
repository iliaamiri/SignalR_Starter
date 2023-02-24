import {useChannels} from "@/lib/hooks/useChannels";
import {ChannelList} from "@/components/ChannelList";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {ChatHubConnectionContext, HandlersContext} from "@/lib/contexts";
import {ChatHub} from "@/lib/hubs/chatHub";
import {Channel, Message} from "@/lib/models";
import SendIcon from '@/assets/send.svg';
import {CreateMessageDto, UpdateMessageDto} from "@/lib/dtos";
import {useLocalStorage} from "@/lib/hooks/useLocalStorage";
import {ChatRoomContent} from "@/components/ChatRoomContent";
import HubResponse = ChatHub.HubResponse;

export function Home() {
    const {channels, setChannels} = useChannels();

    const [messageText, setMessageText] = useState<string>("");

    const {value: senderName, setValue: setSenderName} = useLocalStorage<string>("senderName", "");

    const [selectedChannelId, setSelectedChannelId] = useState<number>(channels[0]?.id ?? -1);

    const chatHubConnection = useContext(ChatHubConnectionContext);

    useEffect(() => {
        chatHubConnection.on(ChatHub.ClientMethods.ReceiveMessage, (message: Message) => {
            console.log("receive message", message);

            setChannels((prevChannels) => {
                console.log("prevChannels", prevChannels)
                const channel = prevChannels[message.channelId];
                if (!channel.messages.find(m => m.id === message.id)) {
                    channel.messages.push(message);
                    return {...prevChannels, [channel.id]: channel};
                }
                return prevChannels;
            });
        });

        chatHubConnection.on(ChatHub.ClientMethods.UpdateMessage, (message: Message) => {
            console.log("update message", message);

            setChannels((prevChannels) => {
                const channel = prevChannels[message.channelId];
                const index = channel.messages.findIndex(m => m.id === message.id);
                if (index > -1) {
                    channel.messages[index] = message;
                    return {...prevChannels, [channel.id]: channel};
                }
                return prevChannels;
            });
        });

        chatHubConnection.on(ChatHub.ClientMethods.DeleteMessage, (message: Message) => {
            console.log("delete message", message);

            setChannels((prevChannels) => {
                const channel = prevChannels[message.channelId];
                const index = channel.messages.findIndex(m => m.id === message.id);
                if (index > -1) {
                    channel.messages.splice(index, 1);
                    return {...prevChannels, [channel.id]: channel};
                }
                return prevChannels;
            });
        });

        return () => {
            chatHubConnection.off(ChatHub.ClientMethods.ReceiveMessage);
            chatHubConnection.off(ChatHub.ClientMethods.UpdateMessage);
            chatHubConnection.off(ChatHub.ClientMethods.DeleteMessage);
        };
    }, [chatHubConnection]);

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            console.log(chatHubConnection, selectedChannelId, messageText, senderName)
            if (e.key === "Enter") {
                handleSendMessage();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [selectedChannelId, messageText, senderName]);

    async function handleSendMessage() {
        try {
            console.log("send message", messageText, selectedChannelId, senderName);
            const message = await chatHubConnection.invoke<Message>(ChatHub.ServerMethods.SendMessage, new CreateMessageDto({
                channelId: selectedChannelId,
                sender: senderName,
                text: messageText
            }));

            setMessageText("");

            console.log(message);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleEditMessage(updateMessageDto: UpdateMessageDto) {
        try {
            console.log("edit message", updateMessageDto, senderName);
            const hubResponse = await chatHubConnection.invoke<HubResponse<Message>>(ChatHub.ServerMethods.UpdateMessage, updateMessageDto);

            console.log(hubResponse);
        } catch (err) {
            console.error(err);
        }
    }

    const handleNewChannel = async (channelName: string): Promise<boolean> => {
        try {
            const channel = await chatHubConnection.invoke<Channel>(ChatHub.ServerMethods.CreateChannel, channelName);

            console.log(channel);

            channels[channel.id] = channel;

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const handleDeleteMessage = async (messageId: number): Promise<void> => {
        try {
            await chatHubConnection.invoke(ChatHub.ServerMethods.DeleteMessage, messageId);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSelectChannel = (channelId: number) => {
        console.log("select channel", channelId);

        setSelectedChannelId(channelId);
    };

    return (
        <div className="container h-screen p-5 mx-auto">
            <div className={"h-full flex rounded-lg bg-slate-300"}>
                <div className="flex w-3/12 p-2">
                    <div className={"rounded bg-slate-600 w-full p-3"}>
                        <h1 className={"text-3xl font-bold"}>Chat App</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <label className="input-group input-group-vertical">
                                <span>Name</span>
                                <input type="text" placeholder="..." value={senderName}
                                       onChange={(e) => setSenderName(e.target.value)}
                                       className="input input-bordered"/>
                            </label>
                        </div>

                        <ChannelList channels={channels} onNewChannel={handleNewChannel}
                                     onSelectChannel={handleSelectChannel}/>
                    </div>
                </div>
                <div className='flex w-9/12 p-2'>
                    <div className={"flex flex-col rounded bg-slate-600 w-full p-3"}>
                        <div className="navbar rounded-lg bg-primary text-primary-content">
                            <div className="flex-1">
                                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                            </div>
                            <div className="flex-none">
                                <button className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         className="inline-block w-5 h-5 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={`chat chat-end chat-start chat-header`}>
                        </div>
                        <HandlersContext.Provider value={{ editMessageHandler: handleEditMessage, handleDeleteMessage}}>
                            <ChatRoomContent channels={channels} selectedChannelId={selectedChannelId} senderName={senderName} />
                        </HandlersContext.Provider>
                        <div className={"flex flex-row w-full"}>
                            <input type="text" placeholder="Type here" value={messageText} onChange={(e) => setMessageText(e.target.value)} className="input input-bordered w-full max-w"/>
                            <button className="relative right-10 top-2 btn btn-circle btn-sm"
                                    onClick={handleSendMessage}>
                                <img src={SendIcon} className={"w-3/6"} alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

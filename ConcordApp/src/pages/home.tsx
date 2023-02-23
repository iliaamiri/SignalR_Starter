import {useChannels} from "@/lib/hooks/useChannels";
import {ChannelList} from "@/components/ChannelList";
import {useContext, useState} from "react";
import {ChatHubConnectionContext} from "@/lib/contexts";
import {ChatHub} from "@/lib/hubs/chatHub";
import {Channel} from "@/lib/models";
import SendIcon from '@/assets/send.svg';

export function Home() {
    const {channels} = useChannels();

    const [senderName, setSenderName] = useState<string>("");

    const [selectedChannelId, setSelectedChannelId] = useState<number>(channels[0]?.id ?? -1);

    const chatHubConnection = useContext(ChatHubConnectionContext);

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

    const handleSelectChannel = (channelId: number) => {
        console.log("select channel", channelId);
    };

    const handleSendMessage = async () => {

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

                        <ChannelList channels={channels} onNewChannel={handleNewChannel} onSelectChannel={handleSelectChannel} />
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

                        <div
                            className={"flex flex-1 rounded-lg bg-slate-200 h-fit w-full p-3 bg-slate-300 mt-2 overflow-y-auto"}>
                            {
                                selectedChannelId === -1 ? (
                                    <p className={"text-2xl mx-auto text-center justify-self-center self-center"}>No messages</p>
                                ) : channels[selectedChannelId].messages.map(message => (
                                    <div className={`chat chat-${message.sender !== senderName ? 'start' : 'end'}`}>
                                        <div className={`chat-bubble ${message.sender !== senderName ? "" : "chat-bubble-primary"}`}>{message.text}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={"flex flex-row w-full"}>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w"/>
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

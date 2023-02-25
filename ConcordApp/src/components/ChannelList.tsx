import {Channel} from "@/lib/models";
import {useState} from "react";

interface Props {
    channels: Record<number, Channel>;
    onNewChannel: (name: string) => Promise<boolean>;
    onSelectChannel: (channelId: number) => void;
    onDeleteChannel: (channelId: number) => void;
    selectedChannelId: number;
}

export function ChannelList({ channels, selectedChannelId, onNewChannel, onSelectChannel, onDeleteChannel }: Props) {
    const [channelName, setChannelName] = useState<string>("");

    const handleClick = async () => {
        const success = await onNewChannel(channelName);
        console.log("new channel success", success);
        setChannelName("");
    };

    return (
        <>
            <ul className="menu bg-base-100 mt-10 w-full p-2 rounded-box">
                {Object.values(channels).map((channel) => (
                    <li className={`${channel.id === selectedChannelId ? 'flex flex-row justify-between' : ''}`} key={`channel-${channel.id}`} onClick={() => onSelectChannel(channel.id)}>
                        <a>{channel.name}</a>
                        {channel.id === selectedChannelId && <span onClick={() => onDeleteChannel(channel.id)}>🗑️</span>}
                    </li>
                ))}
                <li><input className={"w-full"} type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder={"Channel Name ... "}/></li>
            </ul>
            <button className={`mt-2 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg ${!(channelName.length > 0) ? "btn-disabled" : ""}`} onClick={handleClick}>Create Channel</button>
        </>
    );
}

import {Channel} from "@/lib/models";
import {useState} from "react";

interface Props {
    channels: Record<number, Channel>;
    onNewChannel: (name: string) => Promise<boolean>;
    onSelectChannel: (channelId: number) => void;
}

export function ChannelList({ channels, onNewChannel, onSelectChannel }: Props) {
    const [channelName, setChannelName] = useState<string>("");

    const handleClick = async () => {
        const success = await onNewChannel(channelName);
        if (success) {
            setChannelName("");
        }
    };

    return (
        <>
            <ul className="menu bg-base-100 mt-10 w-full p-2 rounded-box">
                {Object.values(channels).map((channel) => (
                    <li onClick={() => onSelectChannel(channel.id)}><a>{channel.name}</a></li>
                ))}
                <li><input className={"w-full"} type="text" onChange={(e) => setChannelName(e.target.value)} placeholder={"Channel Name ... "}/></li>
            </ul>
            <button className={`mt-2 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg ${!(channelName.length > 0) ? "btn-disabled" : ""}`} onClick={handleClick}>Create Channel</button>
        </>
    );
}

import {useContext, useEffect, useRef, useState} from "react";
import {Channel} from "@/lib/models";
import {ChatHubConnectionContext} from "@/lib/contexts";
import {ChatHub} from "@/lib/hubs/chatHub";

interface HookReturnProps {
    channels: Record<number, Channel>;
}

export function useChannels(): HookReturnProps {
    const [channels, setChannels] = useState<Record<number, Channel>>({});

    const chatHubConnection = useContext(ChatHubConnectionContext);

    useEffect(() => {
        (async () => {
            try {
                const resolvedChannels = await chatHubConnection.invoke<Channel[]>(ChatHub.ServerMethods.GetChannels);
                console.log("channels", resolvedChannels);
                const tmpChannels: Record<number, Channel> = {};
                resolvedChannels.forEach(channel => {
                    tmpChannels[channel.id] = channel;
                });
                setChannels(tmpChannels);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return { channels };
}

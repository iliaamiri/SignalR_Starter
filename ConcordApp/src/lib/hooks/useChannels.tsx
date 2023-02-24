import React, {useContext, useEffect, useRef, useState} from "react";
import {Channel} from "@/lib/models";
import {ChatHubConnectionContext} from "@/lib/contexts";
import {ChatHub} from "@/lib/hubs/chatHub";

interface HookReturnProps {
    channels: Record<number, Channel>;

    setChannels: React.Dispatch<React.SetStateAction<Record<number, Channel>>>;
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
                    chatHubConnection.invoke(ChatHub.ServerMethods.JoinChannel, channel.id);
                });
                setChannels(tmpChannels);

                return () => {
                    Object.keys(channels).forEach(channelId => {
                        chatHubConnection.invoke(ChatHub.ServerMethods.LeaveChannel, channelId);
                    });
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return { channels, setChannels };
}

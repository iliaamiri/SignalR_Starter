import {useEffect, useRef, useState} from "react";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

interface hookReturnProps {
    connection?: HubConnection;
    isConnectionFailed: boolean;
}

export function useSignalR(url: string): hookReturnProps {
    let [connection, setConnection] = useState<HubConnection | undefined>(
        undefined
    );
    let isConnectionFailed = useRef<boolean>(false).current;

    useEffect(() => {
        let canceled = false;
        const connection = new HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        connection
            .start()
            .then(() => {
                if (!canceled) {
                    setConnection(connection);
                }
            })
            .catch((error) => {
                isConnectionFailed = true;
                console.log("signal error", error);
            });

        connection.onclose((error) => {
            if (canceled) {
                return;
            }
            console.log("signal closed");
            setConnection(undefined);
        });

        connection.onreconnecting((error) => {
            if (canceled) {
                return;
            }
            console.log("signal reconnecting");
            setConnection(undefined);
        });

        connection.onreconnected((error) => {
            if (canceled) {
                return;
            }
            console.log("signal reconnected");
            setConnection(connection);
        });

        // Clean up the connection when the component unmounts
        return () => {
            canceled = true;
            connection.stop();
        };
    }, []);

    return { connection, isConnectionFailed };
}

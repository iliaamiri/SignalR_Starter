import {createContext} from "react";
import {HubConnection} from "@microsoft/signalr";

export const ChatHubConnectionContext = createContext<HubConnection>(null!);

export const HandlersContext = createContext<any>({});


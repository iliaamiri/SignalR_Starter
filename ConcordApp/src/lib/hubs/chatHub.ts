export namespace ChatHub {
    export const ServerMethods = {
        CreateChannel: "CreateChannel",
        GetChannels: "GetChannels",
        SendMessage: "SendMessage",
        UpdateMessage: "UpdateMessage",
        DeleteMessage: "DeleteMessage",
        JoinChannel: "JoinChannel",
        LeaveChannel: "LeaveChannel"
    };

    export const ClientMethods = {
        ReceiveMessage: "ReceiveMessage",
        UpdateMessage: "UpdateMessage",
        DeleteMessage: "DeleteMessage",
    };

    export interface HubResponse<T> {
        success: boolean;
        data?: T;
        error?: string;
    }
}

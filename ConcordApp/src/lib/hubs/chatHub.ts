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

    export interface HubResponse<T> {
        success: boolean;
        data?: T;
        error?: string;
    }
}

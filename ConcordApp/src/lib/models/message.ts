export class Message {
    id: number;
    text: string;
    sender: string;
    createdAt: Date;
    channelId: number;

    constructor(partial?: Partial<Message>) {
        Object.assign(this, partial);
    }
}

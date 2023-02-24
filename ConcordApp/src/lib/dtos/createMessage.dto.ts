export class CreateMessageDto {
    text: string;
    sender: string;
    channelId: number;

    constructor(partial?: Partial<CreateMessageDto>) {
        Object.assign(this, partial);
    }
}

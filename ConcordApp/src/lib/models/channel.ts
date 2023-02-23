import {Message} from "@/lib/models/message";

export class Channel {
    id: number;
    name: string;

    createdAt: Date;
    updatedAt: Date;

    messages: Message[];

    constructor(partial?: Partial<Channel>) {
        Object.assign(this, partial);
    }
}

export class UpdateMessageDto {
    id: number;
    text: string;

    constructor(partial?: Partial<UpdateMessageDto>) {
        Object.assign(this, partial);
    }
}

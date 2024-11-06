export interface IMessage {
    _id?: string;
    chatId?: string;
    senderId?: string;
    delivered_to?: string[];
    content?: string;
    content_type?: string;
    isDelete?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }
  
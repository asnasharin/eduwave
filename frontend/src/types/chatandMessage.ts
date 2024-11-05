type latest_message = {
    _id?: string;
    chatId?: string;
    senderId?: string;
    delivered_to?: string[];
    content?: string;
    content_type?: string;
    isDelete?: boolean;
    createdAt?: string;
    updatedAt?: string;
    userDetails?: {
      _id?: string;
      userID?: string;
      profile?: string;
      name?: string;
    };
    teacherProfile?: {
      _id?: string;
      userID?: string;
      profile?: string;
      name?: string;
    };
  };
  
  export interface Ichat {
    _id: string;
    isGroupChat?: boolean;
    members?: string[];
    isDelete?: boolean;
    createdAt?: string;
    updatedAt?: string;
    latest_message?: latest_message;
  }
  export type errorMessage = {
    message: string;
    status: number | null;
  };
  
  export interface IChatInitial {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: errorMessage;
    chat: Ichat[];
  }
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
  
  export interface IMessageInitial {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: errorMessage;
    messages: IMessage[];
  }
  
  export type bodydata = {
    chatId: string;
    content: string;
    content_type: string;
  };
  
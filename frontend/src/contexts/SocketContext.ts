import { RefObject, createContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<RefObject<Socket> | null>(null);

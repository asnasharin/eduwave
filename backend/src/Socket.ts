import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { getUsers, userJoin, userLeft, users } from "./utils/user";
import { IMessage } from "./utils/interfaces";

export const setUpSocket = (server: HTTPServer) => {
  const ORIGIN = "http://localhost:5173";
  const io = new Server(server, {
    pingTimeout: 6000,
    cors: {
      origin: ORIGIN,
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.on("setUser", (userId: string) => {
      userJoin(socket.id, userId);
      io.emit("getUsers", getUsers());
    });

    socket.on("send-new-message", (data: IMessage) => {
      const reciverId = data?.delivered_to?.find((e) => e !== data.senderId);
      const deliverTo = users.find((e) => e.userId === reciverId);
      if (reciverId && deliverTo) {
        socket.to(deliverTo.socketId).emit("recieve-message", data);
      }
    });

    socket.on("deleteMessage", (data: IMessage) => {
      const reciverId = data?.delivered_to?.find((e) => e !== data.senderId);
      const deliverTo = users.find((e) => e.userId === reciverId);
      if (reciverId && deliverTo) {
        socket.to(deliverTo.socketId).emit("delete-message", data);
      }
    });

    socket.on("disconnect", () => {
      userLeft(socket.id);
      io.emit("getUsers", getUsers());
    });
  });
};

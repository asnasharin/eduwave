import asynchandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import Chat from "../model/chatModel";
import { ObjectId } from "mongodb";

/**
 * @desc    create chat
 * @route   POST    api/chat
 * @access  private
 */
export const createChat = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const exist = await Chat.findOne({
      members: { $all: [new ObjectId(userId), new ObjectId(req.user?._id)] },
    });
    if (exist) {
      res.status(200).json({
        success: true,
        message: "chat already exist",
        chat: exist,
      });
    } else {
      const newChat = new Chat({
        members: [new ObjectId(req.user?._id), new ObjectId(userId)],
      });
      const chat = await newChat.save();
      if (chat) {
        res.status(200).json({
          sussess: true,
          chat,
        });
      } else {
        next(Error("some thing went wrong"));
      }
    }
  }
);
/**
 * @desc    get all chats of a specific user
 * @route   GET    api/chat
 * @access  private
 */
export const getMychats = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const myChats = await Chat.aggregate([
      {
        $match: {
          members: {
            $elemMatch: {
              $eq: new ObjectId(userId),
            },
          },
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "chatId",
          as: "latest_message",
          pipeline: [
            {
              $match: {
                delivered_to: {
                  $elemMatch: {
                    $eq: new ObjectId(req.user?._id),
                  },
                },
              },
            },
            {
              $sort: { createdAt: -1 },
            },
          ],
        },
      },
      {
        $addFields: {
          latest_message: { $arrayElemAt: ["$latest_message", 0] },
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "latest_message.senderId",
          foreignField: "userID",
          as: "latest_message.teacherProfile",
          pipeline: [
            {
              $project: {
                name: 1,
                profile: 1,
                userID: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$latest_message.teacherProfile",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "latest_message.senderId",
          foreignField: "userID",
          as: "latest_message.userDetails",
          pipeline: [
            {
              $project: {
                name: 1,
                profile: 1,
                userID: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$latest_message.userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    if (myChats) {
      res.status(200).json({
        success: true,
        chats: myChats,
      });
    } else {
      next("Internal server Error");
    }
  }
);

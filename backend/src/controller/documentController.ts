import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import Document from "../model/documentModel";

/**
 * @disc    Upload tutor doc upload
 * @route   POST /api/tutor/updateProfile
 * @access  PROTECTED
 */
export const uploadDoc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const { image, name } = req.body;
    const uploadDoc = await Document.create({
      name: name,
      document: image,
      userID: userId,
    });
    if (uploadDoc) {
      res.status(200).json({
        success: true,
        message: "Document Uploaded Successfully!",
      });
    } else {
      next(Error("Error uploading the Document"));
    }
  }
);

/**
 * @disc    Upload tutor doc upload
 * @route   POST /api/tutor/updateProfile
 * @access  PROTECTED
 */
export const getMydocmunts = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const documents = await Document.find({ userID: userId });
    res.status(200).json({
      success: true,
      documents: documents,
    });
  }
);

/**
 * @disc    Upload tutor doc upload
 * @route   POST /api/tutor/updateProfile
 * @access  PROTECTED
 */
export const deleteDocument = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.body;
    await Document.findByIdAndDelete({ _id: id });
    res.status(200);
    res.json({
      success: true,
    });
  }
);

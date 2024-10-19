import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction, RequestHandler } from "express";
import Assessment, { IAssessment } from "../model/assesmentModel";

/**
 * @disc    create Assessment
 * @route   POST /api/assessment
 * @access  private
 */
export const createAssessment: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, minimumMark, questions } = req.body;
    const creatAssessment = await Assessment.findOneAndUpdate(
      {
        courseId: courseId,
      },
      {
        minimumMark: parseInt(minimumMark, 10),
        questions: questions,
      },
      {
        new: true,
        upsert: true,
      }
    );

    if (creatAssessment) {
      res.status(200).json({
        success: true,
        message: "assessment created Successfully",
        assessment: creatAssessment,
      });
    } else {
      res.status(500);
      next(Error("Internal Server Error!"));
    }
  }
);
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction, RequestHandler } from "express";
import Rating from "../model/ratingModel";

/**
 * @disc    create Rating
 * @route   POST /api/rating
 * @access  private
 */
export const createTutorRating: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rating, review, _id } = req.body;
    const user = req.user;
    const createRating = await Rating.findOneAndUpdate(
      {
        userId: user?._id,
        tutorId: _id,
      },
      {
        rating: parseInt(rating, 10),
        review: review,
      },
      {
        new: true,
        upsert: true,
      }
    );
    if (createRating) {
      res.status(200).json({
        success: true,
        rating: createRating,
      });
    } else {
      next(Error("internel Server Error"));
    }
  }
);

/**
 * @disc    get
 * @route   GET /api/rating
 * @access  private
 */
export const getMyTutorRating: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const getMyRating = await Rating.find({
      userId: userId,
      tutorId: { $ne: null },
    });
    if (getMyRating) {
      res.status(200).json({
        success: true,
        ratings: getMyRating,
      });
    } else {
      res.status(500);
      next(Error("Internal Server Error"));
    }
  }
);

/**
 * @disc    create Rating
 * @route   POST /api/rating/course
 * @access  private
 */
export const createCourseRating: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rating, review, _id } = req.body;
    const user = req.user;
    const createRating = await Rating.findOneAndUpdate(
      {
        userId: user?._id,
        courseId: _id,
      },
      {
        rating: parseInt(rating, 10),
        review: review,
      },
      {
        new: true,
        upsert: true,
      }
    );
    if (createRating) {
      res.status(200).json({
        success: true,
        rating: createRating,
      });
    } else {
      next(Error("internel Server Error"));
    }
  }
);

/**
 * @disc    get all my course
 * @route   GET /api/rating/course
 * @access  private
 */
export const getMyCourseRating: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const getMyRating = await Rating.find({
      userId: userId,
      courseId: { $ne: null },
    });
    if (getMyRating) {
      res.status(200).json({
        success: true,
        ratings: getMyRating,
      });
    } else {
      res.status(500);
      next(Error("Internal Server Error"));
    }
  }
);

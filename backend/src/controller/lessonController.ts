import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectId } from "mongodb";
import Course from "../model/courseModel";
import Lesson from "../model/lessonModel";

/**
 * @disc    Create lesson
 * @route   POST /api/lesson
 * @access  private
 */
export const createLesson: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { courseId, description, duration, video, title } = req.body;
    const isCourseExist = await Course.findOne({ _id: courseId });
    if (!isCourseExist) {
      res.status(404);
      next(Error("course not foud"));
    }
    const newLesson = await Lesson.create({
      courseId: new ObjectId(courseId),
      description,
      title,
      duration,
      video,
    });
    if (newLesson) {
      res.status(200).json({
        success: true,
        message: "lesson created successfully",
        newLesson,
      });
    } else {
      res.status(500);
      next(Error("internal server error"));
    }
  }
);

/**
 * @disc    Get lessons of a course
 * @route   GET /api/lesson/:id
 * @access  private
 */
export const getLessons: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const courseId = req.params.id;
    const lessons = await Lesson.find({
      courseId: new ObjectId(courseId),
      isDelete: false,
    });
    if (lessons) {
      res.status(200).json({
        success: true,
        lessons,
      });
    } else {
      res.status(500);
      next(Error("Internal server Error"));
    }
  }
);

/**
 * @disc    edit lesson
 * @route   PUT /api/lesson/:id
 * @access  private
 */
export const editLesson: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const lessonId = req.params.id;
    const { description, duration, video, title } = req.body;
    const updateLesson = await Lesson.findOneAndUpdate(
      { _id: new ObjectId(lessonId) },
      {
        title,
        description,
        video,
        duration,
      },
      { new: true }
    );
    if (updateLesson) {
      res.status(200).json({
        success: true,
        message: "lesson updated successfully",
        updateLesson,
      });
    } else {
      res.status(500);
      next(Error("internal server Error!"));
    }
  }
);

/**
 * @disc    delete lesson
 * @route   PATCH /api/lesson/:id
 * @access  private
 */
export const deleteLesson: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const lessonId = req.params.id;
    const deleteLesson = await Lesson.findOneAndUpdate(
      { _id: new ObjectId(lessonId) },
      { isDelete: true },
      { new: true }
    );
    if (deleteLesson) {
      res.status(200).json({
        success: true,
        message: "lesson deleted successfully",
      });
    } else {
      res.status(500);
      next(Error("internal server Error!"));
    }
  }
);

import { ICourse, ILesson } from "./courseType";

export interface IEnrollments {
  _id?: string;
  courseId?: string;
  completed?: string[];
  isComplete: boolean;
  course: myCourse;
}

export interface myCourse extends ICourse {
  lessons?: ILesson[];
  hasCertificate?: boolean;
}

export interface IinitialState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  enrollments: IEnrollments[];
  errorMessage: {
    message: string;
    status: number | null;
  };
}

export interface ICerficate {
  ID?: string;
  createdAt?: string;
  user?: { name: string };
  course?: { title: string };
}

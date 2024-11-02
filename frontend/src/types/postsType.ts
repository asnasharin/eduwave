import { errorMessage } from "./authTypes";

export type post = {
  _id?: string;
  title: string;
  description: string;
  subject: string;
  budget: number | string;
  language: string;
};
export interface IStudentPost {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isUpdated: boolean;
  erroMessage: errorMessage | string;
  posts: post[];
}

export interface IPosts {
  _id?: string;
  studentId: string;
  title: string;
  description: string;
  language: string;
  subject: string;
  budget: number;
  profile: {
    name: string;
    profile: string;
  };
  reqStatus: string;
}

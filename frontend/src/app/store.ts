import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import authSlice from "../features/auth/authSlice";
import userSlice from "../features/users/userSlice"
import studentPosts from "../features/studentPosts/StudentPostsSlice"
import courseSlice from "../features/course/courseSlice"
import tutorReducer from "../features/tutors/tutorSlice";
import courseDetailSlice from "../features/course/courseDetails/CourseDetails";
import enrollmentSlice from "../features/enrollment/enrollmentSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userSlice,
    studentPosts: studentPosts,
    course: courseSlice,
    tutor: tutorReducer,
    courseDetail: courseDetailSlice,
    enrollments: enrollmentSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

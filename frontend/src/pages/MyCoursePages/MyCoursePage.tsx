import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import StudentNav from "../../components/NavBar/StudentNav";
import StudentSideBar from "../../components/StudentSideBar/StudentSideBar";
import { getEntollments } from "../../features/enrollment/enrollmentService";
import MyCouresCard from "../../components/MycourseCard/MyCourseCard";
import CouresCardSkeleton from "../../components/skeletons/courseCardSkeletons";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function MyCouresPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, enrollments } = useAppSelector(
    (state) => state.enrollments
  );
  useEffect(() => {
    dispatch(getEntollments());
  }, [dispatch]);
  return (
    <>
      <StudentNav />
      <div className="flex flex-wrap md:px-10 md:pt-10 md:pb-44  p-4 gap-10 bg-secondary">
        <StudentSideBar />
        <div className="flex-flex-col w-full max-w-[50rem] space-y-5">
          {enrollments.length === 0 && !isLoading && (
            <>
              <div className="flex items-center min-h-64 justify-center gap-5">
                <h1 className="text-gray-400">
                  No Enrollments{" "}
                  <span
                    onClick={() => navigate("/courses")}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Explore Course
                  </span>
                </h1>
              </div>
            </>
          )}
          <div className="flex flex-wrap gap-5">
            {isLoading ? (
              <>
                <CouresCardSkeleton />
                <CouresCardSkeleton />
                <CouresCardSkeleton />
                <CouresCardSkeleton />
              </>
            ) : (
              <>
                {enrollments.map((e, i) => {
                  return (
                    <>
                      <MyCouresCard
                        completed={e.completed}
                        lessons={e.course.lessons}
                        coverIMG={e.course.coverIMG}
                        description={e.course.description}
                        price={e.course.price}
                        title={e.course.title}
                        language={e.course.language}
                        _id={e.courseId}
                        key={i}
                      />
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

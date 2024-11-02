import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import TutorPostCard from "../../components/TutorPostCard/TutorPostCard";
import { useEffect, useState } from "react";
import { IPosts } from "../../types/postsType";
import api from "../../Api/api";
import { useAppDispatch } from "../../app/store";
import { getStudentProfile } from "../../features/users/userService";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";

export default function TutorHomePage() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStudentProfile());
  }, [dispatch]);

  useEffect(() => {
    (async function () {
      try {
        const response = await api.get("/tutor/posts", {
          withCredentials: true,
        });
        if (response.data) {
          setPosts(response.data.posts);
          setIsRequestSent(false);
        }
      } catch (_error) {
        toast.error("Error")
      }
    })();
  }, [isRequestSent]);

  return (
    <>
      <NavBar role="TUTOR" />
      <div className="flex justify-center relative w-full bg-secondary py-5"></div>
      <div className="w-full pb-12 gap-3 flex justify-center flex-wrap bg-secondary">
        <div className="flex flex-col gap-3">
          <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
            <h1 className="font-bold text-4xl text-white">My Profile</h1>
            <Link to={"/tutor/profile"}>
              <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
            </Link>
          </div>
          <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
            <h1 className="font-bold text-4xl text-white">My Students</h1>
            <Link to={"/tutor/my-students"}>
              <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
            <h1 className="font-bold text-4xl text-white">My documents</h1>
            <Link to={"/tutor/documents"}>
              <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
            </Link>
          </div>
          <div className="card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]">
            <h1 className="font-bold text-4xl text-white">My Courses</h1>
            <Link to={"/tutor/courses"}>
              <h1 className="absolute top-3 right-5  text-[#9747FF]">View</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#302c35] flex flex-wrap justify-center md:justify-start gap-5 px-2 md:px-10  py-10">
        <div className="w-full flex justify-center">
          <h1 className="font-bold md:text-5xl text-center text-3xl text-white mb-5">
            STUDENT POSTS
          </h1>
        </div>
        {posts.map((e, i) => {
          return (
            <TutorPostCard
              setIsRequestSent={setIsRequestSent}
              budget={e.budget}
              description={e.description}
              language={e.language}
              profile={e.profile}
              subject={e.subject}
              title={e.title}
              key={i}
              reqStatus={e.reqStatus}
              studentId={e.studentId}
              isRequestSent={isRequestSent}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

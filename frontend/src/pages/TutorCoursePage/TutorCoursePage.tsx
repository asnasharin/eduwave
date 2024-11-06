import { Link } from "react-router-dom";
import CourseCard from "../../components/CourseCard/CourseCard";
import NavBar from "../../components/NavBar/NavBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CreateCourseModal from "../../components/Modal/CreateCourseModal/CreateCourseModal";
import EditCourseModal from "../../components/Modal/CreateCourseModal/EditCourseModal";
import { useEffect, useState } from "react";
import { ICourse } from "../../types/courseType";
import api from "../../Api/api";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";

export default function TutorCoursePage() {
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState<boolean>(false);
  const [updatd, setUpdated] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);

  const [editCourseId, setEditCourseId] = useState<string>("");
  const [initialState, setInitialState] = useState<ICourse>({
    coverIMG: "",
    description: "",
    price: "",
    title: "",
  });
  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get("/tutor/my_courses", {
          withCredentials: true,
        });
        setCourses(data.courses);
      } catch (_err) {
        toast.error("Error")
      }
    })();
  }, [updatd]);

  useEffect(() => {
    if (editCourseId) {
      setInitialState(courses.find((e) => e._id === editCourseId) as ICourse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCourseId]);

  useEffect(() => {
    if (initialState.title && editCourseId) {
      setEditOpenModal(true);
    }
  }, [editCourseId, initialState.title]);

  return (
    <>
      <EditCourseModal
        initialstate={initialState}
        openModal={editOpenModal}
        setOpenModal={setEditOpenModal}
        setEditCourseId={setEditCourseId}
        setUpdated={setUpdated}
        setInitialState={setInitialState}
      />
      <CreateCourseModal
        openModal={openModal}
        setUpdated={setUpdated}
        setOpenModal={setOpenModal}
      />

      <NavBar role="TUTOR" />
      <div className="flex w-full flex-col pb-28 items-center bg-secondary">
        <h1 className="font-bold text-5xl text-white mt-10">My Courses</h1>
        <div className="w-[80%] mt-3 flex justify-between">
          <div className="flex items-center">
            <Link to={"/"} className="font-bold text-white">
              <ChevronLeftIcon className="mb-1" /> Back
            </Link>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-primary px-5 py-2 rounded-md text-white font-bold"
          >
            Create Course
          </button>
        </div>
        <div className="flex flex-wrap mt-10">
          {courses.map((e, i) => (
            <CourseCard
              coverIMG={e.coverIMG}
              description={e.description}
              price={e.price}
              title={e.title}
              key={i}
              setUpdated={setUpdated}
              _id={e._id}
              setEditCourseId={setEditCourseId}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

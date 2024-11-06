import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useState } from "react";
import CreateLessonModal from "../../components/Modal/LessonModal/CreateLessonModal";
import LessonsTable from "../../components/LessonTable/LessonTable";
import { ILesson } from "../../types/courseType";
import api from "../../Api/api";
import EditLessonModal from "../../components/Modal/LessonModal/EditLessonModal";
import CreateAssessment from "../../components/Modal/AssessmentModal/CreateAssessment";
import Footer from "../../components/Footer/Footer";

export default function LessonsPage() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [editOpenModal, setEditOpenModal] = useState<boolean>(false);
  const [editLessonId, setEditLessonId] = useState<string>("");
  const [openAssessmentModal, setOpeAssessmentModal] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<ILesson>({
    courseId: "",
    description: "",
    duration: "",
    title: "",
    video: "",
  });

  useEffect(() => {
    if (editLessonId) {
      setInitialState(lessons.find((e) => e._id === editLessonId) as ILesson);
      setEditOpenModal(true);
    }
  }, [editLessonId, lessons]);

  useEffect(() => {
    (async function () {
      const { data } = await api.get(`/lesson/${id}`, {
        withCredentials: true,
      });
      setLessons(data.lessons);
    })();
  }, [id, updated]);

  return (
    <>
      <EditLessonModal
        initialState={initialState}
        setOpenModal={setEditOpenModal}
        openModal={editOpenModal}
        setUpdated={setUpdated}
        setEditLessonId={setEditLessonId}
      />
      <CreateLessonModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        courseId={id as string}
        setUpdated={setUpdated}
      />
      <CreateAssessment
        openModal={openAssessmentModal}
        setOpenModal={setOpeAssessmentModal}
        courseId={id as string}
      />
      <NavBar role="TUTOR" />
      <div className="flex w-full flex-col pb-28 items-center bg-secondary">
        <h1 className="font-bold text-5xl text-white mt-10">Lessons</h1>
        <div className="w-[80%] mt-3 flex justify-between">
          <div className="flex items-center">
            <Link to={"/tutor/courses"} className="font-bold text-white">
              <ChevronLeftIcon className="mb-1" /> Back
            </Link>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setOpeAssessmentModal(true)}
              className="bg-primary px-5 py-2 rounded-md text-white font-bold"
            >
              Assessment
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-primary px-5 py-2 rounded-md text-white font-bold"
            >
              Add Lessons
            </button>
          </div>
        </div>
        <div className="w-[100%] flex justify-center">
          <LessonsTable
            setEditLessonId={setEditLessonId}
            setUpdated={setUpdated}
            lessons={lessons}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

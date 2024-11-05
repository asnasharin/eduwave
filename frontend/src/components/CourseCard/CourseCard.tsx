import { ICourse } from "../../types/courseType";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../Api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface Prop extends ICourse {
  setUpdated: Dispatch<SetStateAction<boolean>>;
  setEditCourseId: Dispatch<SetStateAction<string>>;
}

export default function CourseCard({
  coverIMG,
  description,
  price,
  title,
  _id,
  setUpdated,
  setEditCourseId,
}: Prop) {
  const [deleteCourseId, setDeleteCourseId] = useState<string>("");
  useEffect(() => {
    (async function () {
      if (deleteCourseId) {
        await api.patch(
          `/course/${deleteCourseId}`,
          {},
          { withCredentials: true }
        );
        setUpdated(true);
        setDeleteCourseId("");
        toast.success("Course deleted successfully");
      }
    })();
  }, [deleteCourseId, setUpdated]);

  const deleteCourse = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "are you sure want to delete this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "yes delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteCourseId(id);
      }
    });
  };
  return (
    <>
      <div className="relative course-card w-72">
        <div className="flex flex-col bg-mycard-body hover:scale-105 duration-300 hover:shadow-lg w-60 h-fit rounded-2xl">
          <img
            src={coverIMG}
            alt=""
            className="rounded-2xl h-32 object-cover overflow-hidden hover:border-b-4 border-my-ring"
          />
          <div className="leading-none m-3">
            <h1 className="font-bold text-white text-2xl">{title}</h1>
            <div>
              <small className="text-gray-300"> ₹{price}</small>
            </div>
            <small className="text-white leading-none">{description}</small>
          </div>
          <Link to={`/tutor/lessons/${_id}`}>
            <button className="font-bold text-white w-full bg-primary hover:bg-my-ring py-2 rounded-b-2xl">
              view
            </button>
          </Link>
        </div>
        <div className="absolute options right-4 top-0 flex flex-col items-center justify-center">
          <div onClick={() => deleteCourse(_id as string)}>
            <DeleteIcon className="cursor-pointer text-primary hover:text-white" />
          </div>
          <div onClick={() => setEditCourseId(_id as string)}>
            <ModeEditIcon className="cursor-pointer text-primary hover:text-white" />
          </div>
        </div>
      </div>
    </>
  );
}

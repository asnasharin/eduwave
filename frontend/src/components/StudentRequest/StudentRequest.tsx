import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ITutorRequests } from "../../types/studentTypes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import api from "../../Api/api";
import { toast } from "react-toastify";

interface PROP extends ITutorRequests {
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
}

export default function StudentRequestCard({
  isUpdate,
  setIsUpdate,
  student,
  _id,
  studentId,
}: PROP) {
  const [accept, setAccept] = useState<{ id: string; studentId: string }>({
    id: "",
    studentId: "",
  });
  const [deleteId, setDeleteId] = useState<string>("");

  useEffect(() => {
    (async function () {
      if (accept.id && accept.studentId && !isUpdate) {
        try {
          const response = await api.post(
            `/tutor/acceptRequest/${accept.id}`,
            { studentId: accept.studentId },
            { withCredentials: true }
          );
          if (response) {
            toast.success(response.data.message);
            setAccept({ id: "", studentId: "" });
            setIsUpdate(true);
          }
        } catch (_error) {
          toast.error("Error")
        }
      }
    })();
  }, [accept, setIsUpdate, isUpdate]);

  useEffect(() => {
    (async function () {
      if (deleteId && !isUpdate) {
        try {
          const response = await api.delete(
            `/tutor/deleteRequest/${deleteId}`,
            { withCredentials: true }
          );
          if (response) {
            setIsUpdate(true);
            setDeleteId("");
            toast("Request rejected!");
          }
        } catch (_error) {
          toast.error("Error")
        }
      }
    })();
  }, [deleteId, setIsUpdate, isUpdate]);

  const acceptRequest = (id: string, studentId: string) => {
    setAccept({
      id,
      studentId,
    });
  };

  const deleteRequest = (id: string) => {
    setDeleteId(id);
  };

  return (
    <>
      <div className="bg-[#251231]  flex justify-between items-center rounded-2xl mt-3 p-4 w-[95%]">
        <div className="flex gap-5 items-center">
          <img
            src={
              student.profile
                ? student.profile
                : "https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
            }
            className="w-10 h-10 rounded-full border-2 border-violet-700"
            alt=""
          />
          <div className="">
            <h1 className="text-white font-bold text-md">{student.name}</h1>
            <div className="flex gap-1 mt-2">
              {student.subjects &&
                student.subjects.map((e) => (
                  <small className="px-2 bg-primary/[0.4] rounded-full">
                    {e}
                  </small>
                ))}
            </div>
          </div>
        </div>
        <div className="me-5 flex gap-2">
          <span onClick={() => acceptRequest(_id, studentId)}>
            <CheckCircleIcon
              fontSize="large"
              className="text-green-500 hover:text-green-700 cursor-pointer"
            />
          </span>
          <span onClick={() => deleteRequest(_id)}>
            <CancelIcon
              fontSize="large"
              className="text-red-500 hover:text-red-700 cursor-pointer"
            />
          </span>
        </div>
      </div>
    </>
  );
}

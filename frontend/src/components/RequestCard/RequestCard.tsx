import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { IRequests } from "../../types/studentTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../../Api/api";
import { toast } from "react-toastify";

interface PROP extends IRequests {
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
}

export default function RequestCard({
  teacher,
  _id,
  teacherId,
  setIsUpdate,
  isUpdate,
}: PROP) {
  const [accept, setAccept] = useState<{ id: string; teacherId: string }>({
    id: "",
    teacherId: "",
  });
  const [deleteId, setDeleteId] = useState<string>("");

  useEffect(() => {
    (async function () {
      if (accept.id && accept.teacherId && !isUpdate) {
        try {
          const response = await api.post(
            `/student/acceptRequest/${accept.id}`,
            { teacherId: accept.teacherId },
            { withCredentials: true }
          );
          if (response) {
            toast.success(response.data.message);
            setAccept({ id: "", teacherId: "" });
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
            `/student/deleteRequest/${deleteId}`,
            { withCredentials: true }
          );
          if (response) {
            setIsUpdate(true);
            setDeleteId("");
            toast("Request rejected!");
          }
        } catch (_error) {
          toast.error("Error");
        }
      }
    })();
  }, [deleteId, setIsUpdate, isUpdate]);

  const acceptRequest = (id: string, teacherId: string) => {
    setAccept({
      id,
      teacherId,
    });
  };

  const deleteRequest = (id: string) => {
    setDeleteId(id);
  };

  return (
    <>
      <div className="bg-[#251231]  flex justify-between items-center rounded-2xl mt-3 p-4 w-[70%]">
        <div className="flex gap-5">
          <img
            src={
              teacher.profile
                ? teacher.profile
                : "https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
            }
            className="w-16 rounded-full border-2 border-violet-700"
            alt=""
          />
          <div className="">
            <h1 className="text-white font-bold text-3xl">{teacher.name}</h1>
            <small className="text-white ">{teacher.bio}</small>
          </div>
        </div>
        <div className="me-5 flex gap-2">
          <span onClick={() => acceptRequest(_id, teacherId)}>
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

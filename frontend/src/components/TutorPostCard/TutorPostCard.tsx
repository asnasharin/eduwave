import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPosts } from "../../types/postsType";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import api from "../../Api/api";

interface PROP extends IPosts {
  isRequestSent: boolean;
  setIsRequestSent: Dispatch<SetStateAction<boolean>>;
}

export default function TutorPostCard({
  budget,
  description,
  language,
  profile,
  subject,
  title,
  reqStatus,
  studentId,
  setIsRequestSent,
  isRequestSent,
}: PROP) {
  const [student, setStudent] = useState<string>("");
  const [cancel, setCancel] = useState<string>("");

  useEffect(() => {
    (async function () {
      if (student && !isRequestSent) {
        try {
          const response = await api.post(
            "/tutor/createRequest",
            { studentId: student },
            { withCredentials: true }
          );
          if (response) {
            toast.success(response.data.message);
            setIsRequestSent(true);
            setStudent("");
          }
        } catch (error) {
          const axioserror = error as AxiosError;
          toast.error(axioserror.message);
        }
      }
    })();
  }, [student, setIsRequestSent, isRequestSent]);

  useEffect(() => {
    (async function () {
      if (cancel && !isRequestSent) {
        try {
          const response = await api.post(
            "/tutor/cancelConnection",
            { studentId: cancel },
            { withCredentials: true }
          );
          if (response) {
            setIsRequestSent(true);
            setCancel("");
          }
        } catch (error) {
          const axioserror = error as AxiosError;
          toast.error(axioserror.message);
        }
      }
    })();
  }, [cancel, setIsRequestSent, isRequestSent]);

  const sendConnctionRequest = (id: string) => {
    setStudent(id);
  };
  const cancelConnectionRequest = (id: string) => {
    setCancel(id);
  };

  return (
    <>
      <div className="div">
        <div className="ring-1 h-fit flex w-full items-center justify-between p-3 ring-[#4d2389] bg-[#311d4e] text-white max-w-96 pr-10 pl-5 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <img
              src={
                profile.profile
                  ? profile.profile
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              }
              className="w-10 rounded-full border-2 border-violet-700"
              alt=""
            />
            <h1 className="font-bold text-white text-xl md:text-2xl">
              {profile.name}
            </h1>
          </div>
          {reqStatus === "NONE" && (
            <button
              onClick={() => sendConnctionRequest(studentId)}
              className="bg-primary px-3 text-sm  py-1 rounded-md text-white"
            >
              CONNECT
            </button>
          )}
          {reqStatus === "PENDING" && (
            <button
              onClick={() => cancelConnectionRequest(studentId)}
              className="bg-primary px-3 text-sm  py-1 rounded-md text-white"
            >
              REQUESTED
            </button>
          )}
        </div>
        <div className="ring-1 flex flex-col items-center pb-5 h-fit shadow-2xl ring-[#4d2389] bg-[#1f172b] text-white max-w-96 px-5 rounded-b-2xl">
          <div className="w-full items-start">
            <h1 className=" font-bold mt-5 text-2xl">{title}</h1>
          </div>
          <div className="flex w-full mt-2 justify-between">
            <small>sub: {subject}</small>
            <small> {budget}/hr</small>
          </div>
          <div className="w-full">
            <small>Language: {language}</small>
          </div>
          <div className="bg-[#26223F] w-full mt-2 rounded-md p-3">
            {description}
          </div>
        </div>
      </div>
    </>
  );
}

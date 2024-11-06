import StudentNav from "../../components/NavBar/StudentNav";
import StudentSideBar from "../../components/StudentSideBar/StudentSideBar";
import RequestCard from "../../components/RequestCard/RequestCard";
import { useEffect, useState } from "react";
import { IRequests } from "../../types/studentTypes";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import api from "../../Api/api";

export default function StudentRequests() {
  const [requests, setRequests] = useState<IRequests[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const response = await api.get("/student/requests", {
          withCredentials: true,
        });
        if (response) {
          setRequests(response.data.requests);
          setIsUpdate(false);
        }
      } catch (error) {
        const axioserror = error as AxiosError;
        toast.error(axioserror.message);
      }
    })();
  }, [isUpdate]);

  return (
    <>
      <StudentNav />
      <div className="flex flex-wrap md:px-10 w-full gap-10 p-4 bg-secondary md:pb-64 md:pt-10">
        <StudentSideBar />
        <div className="flex w-full max-w-[50rem] px-3 items-center min-h-28 flex-col pb-10 pt-5 bg-[#302343] ring-1 ring-[#4d2389] rounded-2xl">
          <h1 className="font-bold text-gray-400">Requests</h1>
          {requests.map((e, i) => {
            return (
              <RequestCard
                status={e.status}
                teacherId={e.teacherId}
                teacher={e.teacher}
                _id={e._id}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

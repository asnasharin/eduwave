import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import { IEnrollments, ICerficate } from "../../types/enrollmentType";
import Logo from "../../assets/Logo.svg";
import Signature from "../../assets/Signature.svg";
import api from "../../Api/api";
import { toast } from "react-toastify";
import { formatDate } from "../../utils";

type prop = {
  courseId: string | undefined;
};
export default function Cirtificate({ courseId }: prop) {
  const [course, setCoures] = useState<IEnrollments>();
  const [certifiacte, setCertificate] = useState<ICerficate | null>(null);

  const { enrollments } = useAppSelector((state) => state.enrollments);
  const { profile } = useAppSelector((stata) => stata.userProfile);
  useEffect(() => {
    setCoures(enrollments.find((e) => e.courseId === (courseId as string)));
  }, [courseId, enrollments]);

  useEffect(() => {
    (async function () {
      if (courseId) {
        try {
          const { data } = await api.get(`/certificate/${courseId}`);
          setCertificate(data.certificate);
        } catch (_err) {
          toast.error("Something went wrong!");
        }
      }
    })();
  }, [courseId]);

  return (
    <>
      <div className="flex w-[1000px] relative z-0 ring-4   bg-white p-4 h-[500px] flex-col justify-end items-center">
        <div className="w-full h-full font-medium border-2 border-my-ring rounded-lg">
          <div className="bg-my-input flex flex-col items-center justify-center rounded-lg w-full h-[250px]">
            <img src={Logo} className="w-fit" alt="" />
            <h1 className="mb-8 max-w-[400px] text-gray-200 text-center">
              "Creating a world where learning is accessible to everyone,
              everywhere."
            </h1>
            <h1 className="text-yellow-300 text-2xl font-bold italic">
              COMPLETION CERTFICATE
            </h1>
          </div>
          <div className="flex flex-col h-[250px] items-center justify-start pt-8">
            <h1>This certificate is hereby granted to</h1>
            <h1 className="text-xl font-bold">Ms./Mr. {profile?.name}</h1>
            <h1>
              for successfully completing the course{" "}
              <span className="italic font-bold">{course?.course.title}</span>{" "}
              from TutorNest.
            </h1>
          </div>
        </div>
        <div className="absolute bottom-10 right-28 flex items-center flex-col">
          <img src={Signature} className=" w-32 mix-blend-darken" alt="" />
          <small className="text-gray-900">Admin | TutorNest</small>
        </div>
        <div className="absolute bottom-10 left-28 flex items-start flex-col">
          <small>
            CRT NO : <span className="font-bold">{certifiacte?.ID}</span>
          </small>
          <small>ISSUED : {formatDate(certifiacte?.createdAt as string)}</small>
        </div>
      </div>
    </>
  );
}

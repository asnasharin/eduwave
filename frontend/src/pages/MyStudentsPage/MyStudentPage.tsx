import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MyStudentTable from "../../components/MyStudentTable/MyStudentTable";
import { useEffect, useState } from "react";
import { IMyStudents } from "../../types/tutorTypes";
import api from "../../Api/api";
import { toast } from "react-toastify";

export default function MyStudentsPage() {
  const [students, setStudents] = useState<IMyStudents[]>([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await api.get("/tutor/myStudents", {
          withCredentials: true,
        });
        if (response) {
          setStudents(response.data.students);
        }
      } catch (_error) {
        toast.error("Error")
      }
    })();
  }, []);
  return (
    <>
      <NavBar role="TUTOR" />
      <div className="flex w-full flex-col h-[100vh] items-center bg-secondary">
        <h1 className="font-bold text-5xl text-white mt-10">My Students</h1>
        <div className="w-[80%] mt-3 flex justify-between">
          <div className="flex items-center">
            <Link to={"/"} className="font-bold text-white">
              <ChevronLeftIcon className="mb-1" /> Back
            </Link>
          </div>
        </div>
        <MyStudentTable students={students} />
      </div>
    </>
  );
}

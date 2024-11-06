import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import api from "../../Api/api";
import AdminStudentTable from "../../components/AdminStudentTable/AdminStudentTable";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { IAdminStudent } from "../../types/adminUserTypes";
import { debaunce } from "../../components/util/utilityFunctions";
import { Pagination } from "flowbite-react";
import { toast } from "react-toastify";

export default function AdminStudentPage() {
  const [studentData, setStudentData] = useState<IAdminStudent[]>([]);
  const [blockId, setBlockId] = useState<string>("");
  const [unblockId, setunBlockId] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const onPageChange = (page: number) => setCurrentPage(page);

  const debaunceSearch = debaunce((text: string) => {
    setSearch(text);
  }, 500);

  useEffect(() => {
    (async function () {
      try {
        const response = await api.get(
          `/admin/students?search=${search}&&page=${currentPage}`,
          {
            withCredentials: true,
          }
        );
        setStudentData(response.data.students);
        setCount(response.data.count);
      } catch (_err) {
        toast.error("Error");
      }
    })();
  }, [blockId, unblockId, search, currentPage]);

  return (
    <>
      <NavBar role="ADMIN" />
      <div className="flex flex-col items-center md:p-10 p-4 w-full h-[100vh] bg-secondary">
        <h1 className="font-bold text-white text-4xl">MANAGE STUDENTS</h1>
        <div className="flex flex-wrap items-center justify-between mt-10 w-full md:w-[80%]">
          <Link to={"/"} className="font-bold text-white">
            <ChevronLeftIcon className="mb-1" /> Back
          </Link>
          <div className="flex justify-center items-center">
            <input
              onChange={(e) => debaunceSearch(e.target.value)}
              className="h-8 rounded-lg "
              type="text"
            />
            <SearchIcon fontSize="large" className="text-white" />
          </div>
        </div>
        <AdminStudentTable
          blockId={blockId}
          setBlockId={setBlockId}
          setunBlockId={setunBlockId}
          studentData={studentData}
          unblockId={unblockId}
          key={""}
        />
        <div className="flex mypage overflow-x-auto w-[80%] sm:justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={count}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}

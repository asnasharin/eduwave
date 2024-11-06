import NavBar from "../../components/NavBar/NavBar";
import AdminSideBar from "../../components/AdminSidebar/AdminSideBar";
import { BarChart } from "@mui/x-charts/BarChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import api from "../../Api/api";
import { IDashboardData } from "../../types/adminUserTypes";
import { getAllYears } from "../../utils";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/store";
import { getStudentProfile } from "../../features/users/userService";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function AdminHome() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IDashboardData>({
    students: 0,
    monthlyJoinnings: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    teachers: 0,
  });
  const [year, setYear] = useState<number>(getAllYears()[0]);
  
  useEffect(() => {
    dispatch(getStudentProfile());
  }, [dispatch]);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get(`/admin/get-users?year=${year}`);
        setData(data);
      } catch (_err) {
        toast.error("Error");
      }
    })();
  }, [year]);

  return (
    <>
      <NavBar role="ADMIN" />
      <div className="flex flex-wrap md:p-10  p-4 w-full h-[100vh] bg-secondary">
        <AdminSideBar />
        <div className="md:w-[65vw] w-full">
          <div className="flex w-full justify-center md:px-10 py-1 gap-10">
            <div className="bg-blue-700/[0.3] px-5 py-3 rounded-xl flex flex-col items-center text-gray-200 ring-1 ring-blue-500">
              <h1 className="font-bold text-4xl">{data.teachers}</h1>
              <h1 className="font-medium text-3xl">Teachers</h1>
            </div>
            <div className="bg-cyan-600/[0.3] px-5 py-3 rounded-xl flex flex-col items-center text-gray-200 ring-1 ring-green-500">
              <h1 className="font-bold text-4xl">{data.students}</h1>
              <h1 className="font-medium text-3xl">Students</h1>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4 text-gray-200 w-full">
            <h1>users in</h1>
            <select
              onChange={(e) => setYear(e.target.value as unknown as number)}
              className="ms-2 px-3 py-0 text-sm mt-1 bg-my-bg-dark text-gray-200 rounded-md "
              name="year"
              id=""
            >
              {getAllYears().map((e) => (
                <option value={e}>{e}</option>
              ))}
            </select>
          </div>
          <ThemeProvider theme={darkTheme}>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: data.monthlyJoinnings,
                },
              ]}
              height={300}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";
import { useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleIcon from "@mui/icons-material/People";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";

export default function AdminSideBar() {
  const [isHidden, setIsHidden] = useState<string>("hidden");
  const location = useLocation();
  return (
    <>
      <div className="flex-col w-full max-w-80 min-w-72 flex items-start">
        <span
          onClick={() =>
            setIsHidden((v) => (v === "hidden" ? "inline-block" : "hidden"))
          }
          className="font-bold inline-block md:hidden text-white"
        >
          <MenuIcon />
        </span>
        <div
          className={`${isHidden} rounded-xl space-y-2 font-bold text-2xl h-fit p-3 md:inline-block bg-[#302343] ring-1 ring-[#4d2389] min-w-80 text-gray-300`}
        >
          <Link
            to={"/admin"}
            className={`hover:bg-[#3f344e]/80 ${
              location.pathname === "/admin" ? "bg-[#3f344e]/80" : ""
            } py-1 w-full rounded px-5 flex items-center justify-start gap-2`}
          >
            <GridViewIcon /> Dasboard
          </Link>
          <Link
            to={"/admin/tutors"}
            className={`hover:bg-[#3f344e]/80 ${
              location.pathname.includes("/admin/tutors")
                ? "bg-[#3f344e]/80"
                : ""
            } py-1 w-full rounded px-5 flex items-center justify-start gap-2`}
          >
            <PeopleIcon /> Manage Tutors
          </Link>
          <Link
            to={"/admin/students"}
            className={`hover:bg-[#3f344e]/80 py-1 w-full rounded px-5 flex items-center justify-start gap-2`}
          >
            <PeopleOutlineIcon /> Manage Students
          </Link>
          <Link
            to={"/admin/profile"}
            className={`hover:bg-[#3f344e]/80 ${
              location.pathname === "/admin/profile" && "bg-[#3f344e]/80"
            } py-1 w-full rounded px-5 flex items-center justify-start gap-2`}
          >
            <SettingsIcon /> Settings
          </Link>
        </div>
      </div>
    </>
  );
}

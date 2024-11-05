import Drawer from "@mui/material/Drawer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
// import { ITutorRequests } from "../../types/studentTypes";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import api from "../../Api/api";
// import StudentRequestCard from "../StudentRequestCard/StudentRequestCard";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type prop = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ConnectionsDrawer({ open, setOpen }: prop) {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

//   const [requests, setRequests] = useState<ITutorRequests[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const response = await api.get("/tutor/requests", {
          withCredentials: true,
        });
        if (response) {
        //   setRequests(response.data.requests);
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
      <ThemeProvider theme={darkTheme}>
        <Drawer open={open} anchor={"right"} onClose={toggleDrawer(false)}>
          <div className="md:w-96 w-80 ">
            <div
              onClick={() => setOpen(!open)}
              className="mt-3 cursor-pointer ms-3 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-900/[0.3]"
            >
              <CloseIcon />
            </div>
            <div className="flex flex-col items-center">
              <h1>Requests</h1>
              {/* {requests.map((e) => (
                <StudentRequestCard
                  _id={e._id}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                  student={e.student}
                  studentId={e.studentId}
                />
              ))} */}
            </div>
          </div>
        </Drawer>
      </ThemeProvider>
    </>
  );
}

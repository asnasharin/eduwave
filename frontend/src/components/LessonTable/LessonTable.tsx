import { Table } from "flowbite-react";
import { ILesson } from "../../types/courseType";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ShowVideo from "../Modal/ShowVideo";
import Swal from "sweetalert2";
import api from "../../Api/api";
import { toast } from "react-toastify";
import { formatDuration } from "../../utils";

type prop = {
  lessons: ILesson[];
  setUpdated: Dispatch<SetStateAction<boolean>>;
  setEditLessonId: Dispatch<SetStateAction<string>>;
};
export default function LessonsTable({
  lessons,
  setUpdated,
  setEditLessonId,
}: prop) {
  const [video, setVideo] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteLessonId, setDeleteLessonId] = useState<string>("");

  useEffect(() => {
    if (video) {
      setOpenModal(true);
    }
  }, [video]);

  const deleteLeson = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      text: "are you sure want to delete this lesson",
      confirmButtonText: "yes delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteLessonId(id);
      }
    });
  };

  useEffect(() => {
    (async function () {
      if (deleteLessonId) {
        try {
          await api.patch(
            `/lesson/${deleteLessonId}`,
            {},
            { withCredentials: true }
          );
          setDeleteLessonId("");
          setUpdated((e) => !e);
          toast.success("lesson deleted");
        } catch (_err) {
          toast.error("Error");
        }
      }
    })();
  }, [deleteLessonId, setUpdated]);

  return (
    <div className="overflow-x-auto mytable w-[80%] mt-10">
      <ShowVideo
        opentModal={openModal}
        setOpenModal={setOpenModal}
        url={video}
        setVideo={setVideo}
      />
      <Table>
        <Table.Head>
          <Table.HeadCell>SL No</Table.HeadCell>
          <Table.HeadCell>title</Table.HeadCell>
          <Table.HeadCell>duration</Table.HeadCell>
          <Table.HeadCell>description</Table.HeadCell>
          <Table.HeadCell>video</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Eidi/delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {lessons.length > 0 &&
            lessons.map((e, i) => {
              return (
                <>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {i + 1}
                    </Table.Cell>
                    <Table.Cell>{e.title}</Table.Cell>
                    <Table.Cell>
                      {formatDuration(e.duration as unknown as number)}
                    </Table.Cell>
                    <Table.Cell>{e.description}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          if (e.video) {
                            setVideo(e.video);
                          }
                        }}
                        className="font-medium cursor-pointer text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        View
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span onClick={() => deleteLeson(e._id as string)}>
                        <DeleteIcon className="text-primary hover:text-red-600 cursor-pointer" />{" "}
                      </span>
                      <span onClick={() => setEditLessonId(e._id as string)}>
                        <ModeEditIcon className="text-primary cursor-pointer hover:text-blue-600" />
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}

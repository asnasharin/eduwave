import { Table } from "flowbite-react";
import { IMyStudents } from "../../types/tutorTypes";
import { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PROP {
  students: IMyStudents[];
}

export default function MyStudentTable({ students }: PROP) {
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  const createChat = (id: string) => {
    setUserId(id);
  };
  useEffect(() => {
    (async function () {
      if (userId) {
        try {
          await api.post(
            "/chat",
            { userId: userId },
            { withCredentials: true }
          );
          setUserId("");
          navigate("/tutor/chat");
        } catch (_err) {
          toast.error("Error")
        }
      }
    })();
  }, [userId, navigate]);

  return (
    <div className="overflow-x-auto mytable w-[80%] mt-10">
      <Table>
        <Table.Head>
          <Table.HeadCell>SL No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Class</Table.HeadCell>
          <Table.HeadCell>Intrests</Table.HeadCell>
          <Table.HeadCell>Subjects</Table.HeadCell>
          <Table.HeadCell>Language</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Connect</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {students.length > 0 &&
            students.map((e, i) => {
              return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {i + 1}
                  </Table.Cell>
                  <Table.Cell>{e.name}</Table.Cell>
                  <Table.Cell>{e.phone}</Table.Cell>
                  <Table.Cell>{e.standard}</Table.Cell>
                  <Table.Cell>
                    {e.intrests?.map((e) => {
                      return <span>{e},</span>;
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    {e.subjects?.map((e) => {
                      return <span>{e},</span>;
                    })}
                  </Table.Cell>
                  <Table.Cell>{e.preffered_language}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => createChat(e.userID as string)}
                      className="py-1 px-3 bg-primary text-white rounded-md"
                    >
                      CHAT
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}

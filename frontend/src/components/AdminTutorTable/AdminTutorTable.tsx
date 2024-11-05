import { Dispatch, SetStateAction, useEffect } from "react";
import { IAdminTutor } from "../../types/adminUserTypes";
import { Table } from "flowbite-react";
import api from "../../Api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

type prop = {
  tutorData: IAdminTutor[];
  blockId: string;
  unblockId: string;
  setBlockId: Dispatch<SetStateAction<string>>;
  setunBlockId: Dispatch<SetStateAction<string>>;
};
export default function AdminTutorTable({
  tutorData,
  blockId,
  setBlockId,
  unblockId,
  setunBlockId,
}: prop) {
  const blockUser = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text:"are you sure want to block",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes Block!",
    }).then((result) => {
      if (result.isConfirmed) {
        setBlockId(id);
      }
    });
  };
  const unblockUser = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text:"are you sure want to unblock",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes Unlock!",
    }).then((result) => {
      if (result.isConfirmed) {
        setunBlockId(id);
      }
    });
  };
  useEffect(() => {
    (async function () {
      if (blockId) {
        try {
          const response = await api.patch(
            `/admin/user-block/${blockId}`,
            {},
            { withCredentials: true }
          );
          if (response.data.success) {
            setBlockId("");
            toast.success("User Blocked!");
          }
        } catch (err) {
          toast.error("Error");
        }
      }
    })();
  }, [blockId, setBlockId]);

  useEffect(() => {
    (async function () {
      if (unblockId) {
        try {
          const response = await api.patch(
            `/admin/user-unblock/${unblockId}`,
            {},
            { withCredentials: true }
          );
          if (response.data.success) {
            setunBlockId("");
            toast.success("User Unblocked!");
          }
        } catch (err) {
          toast.error("Error");
        }
      }
    })();
  }, [unblockId, setunBlockId]);

  return (
    <div className="overflow-x-auto mytable w-full md:w-[80%] mt-4">
      <Table>
        <Table.Head>
          <Table.HeadCell>SL No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Qualification</Table.HeadCell>
          <Table.HeadCell>subjects</Table.HeadCell>
          <Table.HeadCell>Documents</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Block/unblock</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tutorData.length > 0 &&
            tutorData.map((e, i) => {
              return (
                <>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {i + 1}
                    </Table.Cell>
                    <Table.Cell>{e.name}</Table.Cell>
                    <Table.Cell>
                      {e.qualification.map((e) => (
                        <span>{e}, </span>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      {e.languages.map((e) => (
                        <span>{e}, </span>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/admin/tutors/${e.userID}`}>
                        <span className="font-medium cursor-pointer text-cyan-600 hover:underline dark:text-cyan-500">
                          View
                        </span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {e.user.status ? (
                        <span className="text-green-500 font-bold">active</span>
                      ) : (
                        <span className="text-red-500 font-bold">Blocked</span>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {e.user.status ? (
                        <span
                          onClick={() => blockUser(e.userID)}
                          className="font-medium  cursor-pointer rounded-md bg-red-500 px-5 py-2 text-white"
                        >
                          BLOCK
                        </span>
                      ) : (
                        <span
                          onClick={() => unblockUser(e.userID)}
                          className="font-medium  cursor-pointer rounded-md bg-green-500 px-3 py-2 text-white"
                        >
                          UNBLOCK
                        </span>
                      )}
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

import { Dispatch, SetStateAction, useEffect } from "react";
import { IAdminStudent } from "../../types/adminUserTypes";
import { Table } from "flowbite-react";
import api from "../../Api/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type prop = {
  studentData: IAdminStudent[];
  blockId: string;
  unblockId: string;
  setBlockId: Dispatch<SetStateAction<string>>;
  setunBlockId: Dispatch<SetStateAction<string>>;
};
export default function AdminStudentTable({
  studentData,
  blockId,
  setBlockId,
  unblockId,
  setunBlockId,
}: prop) {
  const blockUser = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "are you sure want to block",
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
      text: "are you sure want to unblock",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes Unblock!",
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
          <Table.HeadCell>Class</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Intrests</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Block/unblock</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {studentData.length > 0 &&
            studentData.map((e, i) => {
              return (
                <>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {i + 1}
                    </Table.Cell>
                    <Table.Cell>{e.name}</Table.Cell>
                    <Table.Cell>{e.standard}</Table.Cell>
                    <Table.Cell>{e.user.email}</Table.Cell>
                    <Table.Cell>
                      {e.intrests.map((e) => (
                        <span>{e}, </span>
                      ))}
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

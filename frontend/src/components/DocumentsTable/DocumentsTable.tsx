import { Table } from "flowbite-react";
import { DocumentType } from "../Documents/Documents";
import ShowImage from "../Modal/ShowImage";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import api from "../../Api/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";

// firebase
import { storage } from "../../app/firebase";
import { ref, deleteObject } from "firebase/storage";

type prop = {
  setDocuments: Dispatch<SetStateAction<DocumentType[]>>;
  documents: DocumentType[];
  role: string;
  updateStatus?: string;
  setUpdateStatus?: Dispatch<SetStateAction<string>>;
};

export default function DocumentTable({
  documents,
  setDocuments,
  role,
  setUpdateStatus,
  updateStatus,
}: prop) {
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState<string>("");
  const [deleteIMG, setDeleteIMG] = useState<string>("");

  const viewImage = (img: string) => {
    setImage(img);
  };
  const deleteDocument = (id: string, url: string) => {
    Swal.fire({
      title: "Are you sure wan't to delete this?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const imageRef = ref(storage, url);
        deleteObject(imageRef)
          .then(() => {})
          .catch(() => {
            toast.error("Error");
          });
        setDeleteIMG(id);
      }
    });
  };
  const changeStatus = (id: string) => {
    if (role === "ADMIN" && setUpdateStatus) {
      Swal.fire({
        title: "Are you sure want to do this?",
        icon: "question",
        confirmButtonText: "Okey!",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setUpdateStatus(id);
        }
      });
    }
  };

  useEffect(() => {
    (async function () {
      if (deleteIMG) {
        try {
          const response = await api.patch(
            "/tutor/deletedocument",
            { id: deleteIMG },
            { withCredentials: true }
          );
          if (response) {
            setDeleteIMG("");
            setDocuments(documents.filter((e) => e._id !== deleteIMG));
            toast.success("Document deleted!");
          }
        } catch (error) {
          const axioserror = error as AxiosError;
          toast.error(axioserror.message);
        }
      }
    })();
  }, [deleteIMG, documents, setDocuments]);

  useEffect(() => {
    (async function () {
      if (role === "ADMIN" && updateStatus && setUpdateStatus) {
        try {
          const response = await api.patch(
            `/admin/document/${updateStatus}`,
            {},
            { withCredentials: true }
          );
          if (response.data.success) {
            setUpdateStatus("");
            toast.success("status updated!");
          }
        } catch (error) {
          const axioserror = error as AxiosError;
          toast.error(axioserror.message);
        }
      }
    })();
  }, [updateStatus, role, setUpdateStatus]);

  useEffect(() => {
    if (image) {
      setOpenModal(true);
    }
  }, [setOpenModal, image]);

  return (
    <div className="overflow-x-auto mytable w-[80%] mt-10">
      <ShowImage
        setImage={setImage}
        opentModal={openModal}
        setOpenModal={setOpenModal}
        url={image}
      />
      <Table>
        <Table.Head>
          <Table.HeadCell>SL No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Uploaded On</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Document</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Eidi/delet</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {documents.length > 0 &&
            documents.map((e, i) => {
              return (
                <>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {i + 1}
                    </Table.Cell>
                    <Table.Cell>{e.name}</Table.Cell>
                    <Table.Cell>{e.createdAt}</Table.Cell>
                    <Table.Cell>
                      {e.isVerified ? (
                        <span className="text-green-500">Verified</span>
                      ) : (
                        <span className="text-red-600">Not Verified</span>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => viewImage(e.document)}
                        className="font-medium cursor-pointer text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        View
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {role === "TUTOR" ? (
                        <span
                          onClick={() => deleteDocument(e._id, e.document)}
                          className="font-medium ms-5 px-3 py-2 rounded-md cursor-pointer text-white bg-red-600 hover:bg-red-900"
                        >
                          delete
                        </span>
                      ) : (
                        <>
                          {!e.isVerified ? (
                            <span onClick={() => changeStatus(e._id)}>
                              <CheckCircleIcon
                                fontSize="large"
                                className="text-green-500 hover:text-green-700 cursor-pointer"
                              />
                            </span>
                          ) : (
                            <span onClick={() => changeStatus(e._id)}>
                              <CancelIcon
                                fontSize="large"
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                              />
                            </span>
                          )}
                        </>
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

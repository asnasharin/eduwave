import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DocumentUpload from "../Modal/DocumentUpload";
import api from "../../Api/api";
import DocumentTable from "../DocumentsTable/DocumentsTable";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export type DocumentType = {
  _id: string;
  name: string;
  document: string;
  createdAt: string;
  isVerified: boolean;
};

export default function Documents() {
  const [openModal, setOpenModal] = useState(false);
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [Uploaded, setUploaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const response = await api.get("/tutor/documents", {
          withCredentials: true,
        });
        if (response) {
          setDocuments(response.data.documents);
        }
      } catch (err) {
        const axioserror = err as AxiosError;
        toast.error(axioserror.message);
      }
    })();
  }, [Uploaded]);

  return (
    <>
      <DocumentUpload
        openModal={openModal}
        setUploaded={setUploaded}
        setOpenModal={setOpenModal}
      />
      <NavBar role="TUTOR" />
      <div className="flex w-full flex-col h-[100vh] items-center bg-secondary">
        <h1 className="font-bold text-5xl text-white mt-10">My Documents</h1>
        <div className="w-[80%] mt-3 flex justify-between">
          <div className="flex items-center">
            <Link to={"/"} className="font-bold text-white">
              <ChevronLeftIcon className="mb-1" /> Back
            </Link>
          </div>
          <button
            className="bg-primary px-5 py-2 rounded-md text-white font-bold"
            onClick={() => setOpenModal(true)}
          >
            Upload Document
          </button>
        </div>
        <DocumentTable role="TUTOR" documents={documents} setDocuments={setDocuments} />
      </div>
    </>
  );
}

import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../Api/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { DocumentType } from "../../components/Documents/Documents";
import DocumentTable from "../../components/DocumentsTable/DocumentsTable";

export default function AdminTutorDocument() {
  const { id } = useParams<string>();
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    (async function () {
      try {
        const response = await api.get(`/admin/tutor/${id}`, {
          withCredentials: true,
        });
        setUserName(response.data.tutor.name);
      } catch (error) {
        const axioserror = error as AxiosError;
        toast.error(axioserror.message);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async function () {
      try {
        const response = await api.get(`/admin/document/${id}`, {
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
  }, [id, updateStatus]);

  return (
    <>
      <NavBar role="ADMIN" />
      <div className="flex flex-col items-center md:p-10 p-4 w-full h-[100vh] bg-secondary">
        <h1 className="font-bold text-white text-4xl">MANAGE TUTORS</h1>
        <div className="flex flex-wrap items-center justify-between mt-10 w-full md:w-[80%]">
          <Link to={"/admin/tutors"} className="font-bold text-white">
            <ChevronLeftIcon className="mb-1" /> Back
          </Link>
          <h1 className="font-bold text-white">Documents of {userName}</h1>
        </div>
        <DocumentTable
          documents={documents}
          setDocuments={setDocuments}
          role="ADMIN"
          key={""}
          setUpdateStatus={setUpdateStatus}
          updateStatus={updateStatus}
        />
      </div>
    </>
  );
}

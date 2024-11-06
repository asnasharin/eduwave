import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IResponse } from "../../types/assessment";
import { useNavigate } from "react-router-dom";
import Cirtificate from "../Certificate/Certificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import api from "../../Api/api";

type Prop = {
  openModal: boolean;
  id: string | undefined;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  AssessmentStatus: IResponse | null;
};
export default function AssessmentSucceess({
  openModal,
  setOpenModal,
  AssessmentStatus,
  id,
}: Prop) {
  const navigate = useNavigate();
  const handleDownloadPDF = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const input = document.getElementById("certificate-downoad");

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("certifiacte.pdf");
      });
    }
  };
  const [ID, setID] = useState<string>("");

  useEffect(() => {
    (async function () {
      if (AssessmentStatus?.success) {
        try {
          const { data } = await api.get(`/certificate/${id}`);
          setID(data.ID);
        } catch (err) {
          await api.post("/certificate", {
            courseId: id,
            ID: ID ? ID : `CERT${Date.now()}`,
          });
        }
      }
    })();
  }, [id, AssessmentStatus?.success, ID]);

  if (AssessmentStatus) {
    return (
      <>
        <Modal show={openModal}>
          <Modal.Body className="bg-mycard-body ring-1 ring-my-ring rounded-md">
            {AssessmentStatus.success ? (
              <>
                <div className="text-gray-200 flex flex-col items-center justify-center text-center">
                  <h1 className="font-bold text-4xl">
                    Great! you passed the test
                  </h1>
                  <small className="max-w-[60%] mt-2">
                    you are eligible for the cirtificate. you can download the
                    certificate by clicking the download button below
                  </small>
                  <div className="flex flex-col ring-1 my-2 px-4 py-1 rounded-xl">
                    <h1 className="mt-2">you score</h1>
                    <h1 className="text-5xl font-bold text-green-500 mb-4">
                      {AssessmentStatus.obtainedScore}/
                      {AssessmentStatus.totalScore}
                    </h1>
                  </div>
                  <div className="flex gap-4 font-bold">
                    <button
                      onClick={handleDownloadPDF}
                      className="py-2 rounded-lg px-4 mt-4 bg-primary"
                    >
                      Get Cirtificate
                    </button>
                    <button
                      onClick={() => navigate("/student")}
                      className="py-2 rounded-lg px-4 mt-4 bg-primary"
                    >
                      Go to Home
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-gray-200 flex flex-col items-center justify-center text-center">
                  <h1 className="font-bold text-4xl">OOPS! you failled</h1>
                  <small className="max-w-[60%] mt-2">
                    you are not eligible for the cirtificate
                  </small>
                  <div className="flex flex-col ring-1 my-2 px-4 py-1 rounded-xl">
                    <h1 className="mt-2">you score</h1>
                    <h1 className="text-5xl font-bold text-red-500 mb-4">
                      {AssessmentStatus.obtainedScore}/
                      {AssessmentStatus.totalScore}
                    </h1>
                  </div>
                  <div className="flex gap-4 font-bold">
                    <button
                      onClick={() => setOpenModal(false)}
                      className="py-2 rounded-lg px-4 mt-4 bg-red-600"
                    >
                      RETRY
                    </button>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
        <div id="certificate-downoad" className="w-fit">
          <Cirtificate courseId={id} />
        </div>
      </>
    );
  }
  return <></>;
}

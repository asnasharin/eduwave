import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { storage } from "../../app/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import api from "../../Api/api";
import { toast } from "react-toastify";

type ModalType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setUploaded: Dispatch<SetStateAction<boolean>>;
};

export default function DcumetUpload({
  openModal,
  setOpenModal,
  setUploaded,
}: ModalType) {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      name: value,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!image || !formData.name) {
      setError("some field are missing");
    } else {
      setError("");
      setSubmit(true);
    }
  };

  useEffect(() => {
    (async function () {
      if (submit && !error && formData) {
        try {
          if (image) {
            const filename = new Date().getTime() + image.name;
            const storageRef = ref(storage, "documets/" + filename);
            const snapshot = await uploadBytes(storageRef, image);
            if (snapshot) {
              const url = await getDownloadURL(storageRef);
              const response = await api.post(
                "/tutor/uploadDoc",
                {
                  image: url,
                  name: formData.name,
                },
                {
                  withCredentials: true,
                }
              );
              if (response) {
                setFormData({ name: "", image: "" });
                toast.success("Document Uploaded");
                setOpenModal(false);
                setUploaded((state) => !state);
                setSubmit(false);
              }
            }
          }
        } catch (_error) {
          toast.error("Error");
        }
      }
    })();
  }, [error, formData, setOpenModal, setUploaded, image, submit]);

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <input type="file" accept="image/*" onChange={handleChange} />
            <div className="flex justify-center w-full mt-3 rounded bg-red-100">
              {error && <small className=" text-red-600">{error}</small>}
            </div>
            <div className=" w-full flex items-start mt-5 flex-col">
              <label htmlFor="text">Name of the Document</label>
              <input
                type="text"
                value={formData.name}
                onChange={onchange}
                className="w-full rounded-md"
                placeholder="Enter the name of the document"
              />
            </div>
          </div>
          <button
            onClick={handleClick}
            className="w-full rounded-md text-white bg-primary font-bold py-2 mt-3"
          >
            UPLOAD
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

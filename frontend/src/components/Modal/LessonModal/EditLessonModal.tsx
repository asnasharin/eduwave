import { Modal } from "flowbite-react";
import { SetStateAction, Dispatch, useState, useEffect } from "react";
import { ILesson } from "../../../types/courseType";
import { validate } from "../../util/validateForms";
import api from "../../../Api/api";
import { storage } from "../../../app/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAppSelector } from "../../../app/store";
import { toast } from "react-toastify";
import { deleteImageFromFirebase } from "../../util/uploadFirebase";
import { getVideoDuration } from "../../../utils";
import Loader3 from "../../Loader/Loader3/Loader";

type Prop = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  initialState: ILesson;
  setUpdated: Dispatch<SetStateAction<boolean>>;
  setEditLessonId: Dispatch<SetStateAction<string>>;
};
export default function EditLessonModal({
  initialState,
  openModal,
  setOpenModal,
  setUpdated,
  setEditLessonId,
}: Prop) {
  const { user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<ILesson>(initialState);
  const [formError, setFormError] = useState<ILesson>(initialState);
  const [video, setVideo] = useState<File | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  const onchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSubmit(false);
  };
  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFormError({
      ...formError,
      description: validate("required", formData.description),
      title: validate("required", formData.title),
      video: validate("required", initialState.video),
    });
    setSubmit(true);
  };
  useEffect(() => {
    (async function () {
      if (
        !formError.video &&
        !formError.description &&
        !formError.duration &&
        !formError.title &&
        formData.description &&
        formData.duration &&
        formData.title &&
        submit
      ) {
        try {
          setLoading(true);
          if (video && initialState.video) {
            await deleteImageFromFirebase(initialState.video);
            const duration = await getVideoDuration(video);
            const filename = new Date().getTime() + video.name;
            const storageRef = ref(storage, "lessonVideo/" + filename);
            const snapshot = await uploadBytes(storageRef, video);
            if (snapshot) {
              const url = await getDownloadURL(storageRef);
              await api.put(
                `/lesson/${initialState._id}`,
                {
                  video: url,
                  title: formData.title,
                  description: formData.description,
                  duration: duration,
                },
                { withCredentials: true }
              );
              setOpenModal(false);
              toast.success("Lesson edited!");
              setFormData(initialState);
              setUpdated((e) => !e);
              setSubmit(false);
              setEditLessonId("");
              setLoading(false);
            }
          } else {
            await api.put(
              `/lesson/${initialState._id}`,
              {
                title: formData.title,
                description: formData.description,
                duration: formData.duration,
              },
              { withCredentials: true }
            );
            setOpenModal(false);
            toast.success("Lesson edited!");
            setSubmit(false);
            setFormData(initialState);
            setUpdated((e) => !e);
            setEditLessonId("");
            setLoading(false);
          }
        } catch (_err) {
          toast.error("Error") 
          setLoading(false);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formError, video, formData, submit, user, setOpenModal]);

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditLessonId("");
        }}
      >
        <Modal.Header className="ring-1 ring-[#4d2389] bg-[#110d17] rounded-t-md">
          <h1 className="text-white font-bold">Edit Lessons</h1>
        </Modal.Header>
        <Modal.Body className="bg-[#110d17] ring-1 ring-[#4d2389] rounded-b-md">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="flex flex-col  md:col-span-2 col-span-2">
              <label htmlFor="title" className="py-2 text-white">
                Title
              </label>
              {formError.title && (
                <small className="text-red-600">{formError.title}</small>
              )}
              <input
                onChange={onchange}
                className="bg-[#251c32] text-white border-0 rounded-md"
                type="text"
                name="title"
                value={formData.title}
                placeholder="Enter the title of the course"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="py-2 text-white">
                video
              </label>
              {formError.video && (
                <small className="text-red-600">{formError.video}</small>
              )}
              <input
                className="bg-[#251c32] text-white border-0 rounded-md "
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setVideo(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="col-span-2 w-full text-white">
              <label htmlFor="description">Description</label>
              {formError.description && (
                <small className="text-red-600">{formError.description}</small>
              )}
              <textarea
                className="w-full mt-4 rounded-md bg-[#251c32] border-0 py-2"
                rows={4}
                name="description"
                value={formData.description}
                onChange={onchange}
                id=""
              ></textarea>
            </div>
            {!loading ? (
              <button
                onClick={handleFormSubmit}
                className="font-bold text-white bg-primary rounded-lg"
              >
                UPDATE
              </button>
            ) : (
              <div className="font-bold flex items-center justify-center text-white bg-primary rounded-lg">
                <Loader3 />
              </div>
            )}
            <button
              onClick={() => setFormData(initialState)}
              className="font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg"
            >
              RESET
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

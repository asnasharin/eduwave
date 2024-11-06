import { Modal } from "flowbite-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { post } from "../../../types/postsType";
import { validate } from "../../util/validateForms";
import { useAppDispatch } from "../../../app/store";
import { updateStudentPosts } from "../../../features/studentPosts/StudentPostsService";

type Prop = {
  editOpenModal: boolean;
  setEditOpenModal: Dispatch<SetStateAction<boolean>>;
  setEditId: Dispatch<SetStateAction<string | undefined>>;
  editId: string | undefined;
  initialState: post;
};

export default function EditPostModal({
  editOpenModal,
  setEditOpenModal,
  editId,
  setEditId,
  initialState,
}: Prop) {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<post>(initialState);
  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  const [formError, setFormError] = useState<post>({
    title: "",
    budget: "",
    description: "",
    language: "",
    subject: "",
  });
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const onchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      _id: editId,
    });
  };
  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormError({
      ...formError,
      title: validate("required", formData.title),
      budget: validate("required", formData.budget),
      description: validate("required", formData.description),
      language: validate("required", formData.language),
      subject: validate("required", formData.subject),
    });
    setIsSubmit(true);
  };

  useEffect(() => {
    if (
      isSubmit &&
      !formError.budget &&
      !formError.title &&
      !formError.description &&
      !formError.language &&
      !formError.subject
    ) {
      dispatch(updateStudentPosts(formData));
      setIsSubmit(false);
      setEditOpenModal(false);
    }
  }, [dispatch, formError, isSubmit, formData, setEditOpenModal]);

  return (
    <>
      {formData && (
        <Modal
          show={editOpenModal}
          onClose={() => {
            setEditOpenModal(false);
            setEditId("");
          }}
        >
          <Modal.Header className="ring-1 ring-[#4d2389] bg-[#110d17] rounded-t-md">
            <h1 className="text-white font-bold">Edit Post</h1>
          </Modal.Header>
          <Modal.Body className="bg-[#110d17] ring-1 ring-[#4d2389] rounded-b-md">
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="flex flex-col  md:col-span-1 col-span-2">
                <label htmlFor="title" className="py-2 text-white">
                  Title
                </label>
                {formError.title && (
                  <small className="text-red-600">{formError.title}</small>
                )}
                <input
                  className="bg-[#251c32] text-white border-0 rounded-md"
                  type="text"
                  name="title"
                  placeholder="Enter the title of the post"
                  value={formData.title}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col   md:col-span-1 col-span-2">
                <label htmlFor="title" className="py-2 text-white">
                  Subject
                </label>
                {formError.subject && (
                  <small className="text-red-600">{formError.subject}</small>
                )}
                <input
                  className="bg-[#251c32] text-white border-0 rounded-md "
                  type="text"
                  name="subject"
                  placeholder="Enter the Subject Name"
                  value={formData.subject}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col md:col-span-1 col-span-2">
                <label htmlFor="language" className="py-2 text-white">
                  Language
                </label>
                {formError.language && (
                  <small className="text-red-600">{formError.language}</small>
                )}
                <input
                  className="bg-[#251c32] text-white border-0 rounded-md "
                  type="text"
                  name="language"
                  placeholder="Enter the Subject Name"
                  value={formData.language}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col md:col-span-1 col-span-2">
                <label htmlFor="budget" className="py-2 text-white">
                  Budget
                </label>
                {formError.budget && (
                  <small className="text-red-600">{formError.budget}</small>
                )}
                <input
                  className="bg-[#251c32] text-white border-0 rounded-md"
                  type="number"
                  name="budget"
                  placeholder="Enter the Subject Name"
                  value={formData.budget}
                  onChange={onchange}
                />
              </div>
              <div className="col-span-2 w-full text-white">
                <label htmlFor="description">Description</label>
                {formError.description && (
                  <small className="text-red-600">
                    {formError.description}
                  </small>
                )}
                <textarea
                  className="w-full mt-4 rounded-md bg-[#251c32] border-0 py-2"
                  onChange={onchange}
                  rows={4}
                  value={formData.description}
                  name="description"
                  id=""
                ></textarea>
              </div>
              <button
                onClick={submitForm}
                className="font-bold text-white px-4 py-2 bg-primary rounded-lg"
              >
                SUBMIT
              </button>
              <button
                onClick={() => setFormData(initialState as post)}
                className="font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg"
              >
                RESET
              </button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

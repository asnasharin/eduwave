import { Modal } from "flowbite-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { post } from "../../../types/postsType";
import { validate } from "../../util/validateForms";
import { useAppDispatch } from "../../../app/store";
import { createStudentPosts } from "../../../features/studentPosts/StudentPostsService";

type Prop = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function CreatePostModal({ openModal, setOpenModal }: Prop) {
  const dispatch = useAppDispatch();
  const initialData: post = {
    title: "",
    description: "",
    budget: "",
    language: "",
    subject: "",
  };
  const [formData, setFormData] = useState<post>(initialData);
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
      dispatch(createStudentPosts(formData));
      setOpenModal(false);
    }
  }, [dispatch, formError, isSubmit, formData, setOpenModal]);

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="ring-1 ring-[#4d2389] bg-[#110d17] rounded-t-md">
          <h1 className="text-white font-bold">Create New Post</h1>
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
                <small className="text-red-600">{formError.description}</small>
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
              onClick={() => setFormData(initialData)}
              className="font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg"
            >
              CLEAR
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

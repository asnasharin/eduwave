import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store";
import { deleteStudentPosts } from "../../features/studentPosts/StudentPostsService";
import Swal from "sweetalert2";

type props = {
  title: string;
  subject: string;
  language: string;
  description: string;
  budget: number | string;
  _id: string | undefined;
  setEditId: Dispatch<SetStateAction<string | undefined>>;
};
export default function PostCard({
  title,
  subject,
  budget,
  description,
  language,
  _id,
  setEditId,
}: props) {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const [deletes, setDeletes] = useState<string | undefined>("");
  useEffect(() => {
    if (deletes) {
      dispatch(deleteStudentPosts(deletes));
    }
  }, [deletes, dispatch]);

  const deletePost = (id: string | undefined) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure wan't to delete this post?",
      icon: "question",
      confirmButtonText: "Yes delete!",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletes(id);
      }
    });
  };
  return (
    <>
      <div className="ring-1 h-fit shadow-2xl ring-[#4d2389] bg-[#1f172b] text-white w-80 md:w-96 relative py-5 pr-10 pl-5 rounded-2xl">
        <h1
          onClick={() => setShow((prev) => !prev)}
          className="font-bold absolute cursor-pointer top-0 right-4 text-3xl"
        >
          ...
        </h1>
        <h1 className=" font-bold mt-5 text-2xl">{title}</h1>
        <div className="flex mt-2 justify-between">
          <small>sub: {subject}</small>
          <small>{budget} /hr</small>
        </div>
        <small>Language: {language}</small>
        <div className="ring-1 mt-2 rounded-md p-4">{description}</div>
        {show && (
          <div className="flex flex-col ring-1 ring-[#4d2389] absolute top-9 right-5 shadow-lg bg-[#1b0f1b] rounded-md p-2">
            <h1
              onClick={() => setEditId(_id)}
              className="text-blue-600 hover:bg-[#322231] rounded-sm cursor-pointer px-2 font-bold"
            >
              Edit
            </h1>
            <div className="ring-1 my-1"></div>
            <h1
              onClick={() => deletePost(_id)}
              className="text-red-600  hover:bg-[#322231] rounded-sm cursor-pointer px-2 font-bold"
            >
              Delete
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

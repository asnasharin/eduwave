import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import StudentNav from "../../components/NavBar/StudentNav";
import StudentSideBar from "../../components/StudentSideBar/StudentSideBar";
import { getStudentPosts } from "../../features/studentPosts/StudentPostsService";
import Loader from "../../components/Loader/Loader1/Loader";
import PostCard from "../../components/PostCard/PostCard";
import CreatePostModal from "../../components/Modal/PostModal/CreatePostModal";
import EditPostModal from "../../components/Modal/PostModal/EditPostModal";
import { reset } from "../../features/studentPosts/StudentPostsSlice";
import { post } from "../../types/postsType";
import Footer from "../../components/Footer/Footer";

export default function StudentPosts() {
  const { isLoading, posts, isUpdated } = useAppSelector(
    (state) => state.studentPosts
  );
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState<string | undefined>("");
  const [initialState, setInitialState] = useState<post>({
    title: "",
    budget: "",
    description: "",
    language: "",
    subject: "",
  });

  useEffect(() => {
    if (editId) {
      setInitialState(posts.find((e) => e._id === editId) as post);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  useEffect(() => {
    if (initialState.budget && editId) {
      setEditOpenModal(true);
    }
  }, [initialState, editId]);

  useEffect(() => {
    if (isUpdated) {
      dispatch(getStudentPosts());
      setInitialState({
        title: "",
        budget: "",
        description: "",
        language: "",
        subject: "",
      });
      dispatch(reset());
      setEditId("");
    }
  }, [dispatch, isUpdated]);

  useEffect(() => {
    dispatch(getStudentPosts());
  }, [dispatch]);

  return (
    <>
      <CreatePostModal openModal={openModal} setOpenModal={setOpenModal} />
      <EditPostModal
        editOpenModal={editOpenModal}
        setEditOpenModal={setEditOpenModal}
        editId={editId}
        setEditId={setEditId}
        initialState={initialState}
      />

      <StudentNav />
      <div className="flex flex-wrap md:px-10 md:pt-10 md:pb-44  p-4 gap-10 bg-secondary">
        <StudentSideBar />
        <div className="flex-flex-col w-full max-w-[50rem] space-y-5">
          <button
            onClick={() => setOpenModal(true)}
            className=" bg-primary px-5 py-1 rounded-md font-bold text-white"
          >
            New Post
          </button>
          <div className="flex flex-wrap gap-5">
            {isLoading ? (
              <Loader />
            ) : (
              posts.length > 0 &&
              posts.map((e, i) => {
                return (
                  <>
                    <PostCard
                      subject={e.subject}
                      title={e.title}
                      budget={e.budget}
                      language={e.language}
                      description={e.description}
                      _id={e._id}
                      key={i}
                      setEditId={setEditId}
                    />
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

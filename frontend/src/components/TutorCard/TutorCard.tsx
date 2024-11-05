import { useNavigate } from "react-router-dom";
import { IMyTutor } from "../../types/studentTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../../Api/api";
import { Irating } from "../../types/ratingTypes";
import { toast } from "react-toastify";

interface prop extends IMyTutor {
  tutorRatings: Irating[];
  setCurrentRating: Dispatch<SetStateAction<Irating | undefined>>;
  setRateTutuorId: Dispatch<SetStateAction<string>>;
}
export default function TutorCard({
  name,
  bio,
  profile,
  userID,
  tutorRatings,
  setCurrentRating,
  setRateTutuorId,
}: prop) {
  const [userId, setUserId] = useState<string>("");

  const navigate = useNavigate();
  const createChat = (id: string) => {
    setUserId(id);
  };
  useEffect(() => {
    (async function () {
      if (userId) {
        try {
          await api.post(
            "/chat",
            { userId: userId },
            { withCredentials: true }
          );
          setUserId("");
          navigate("/student/chat");
        } catch (_err) {
          toast.error("Error");
        }
      }
    })();
  }, [userId, navigate]);

  return (
    <>
      <div className="w-64 flex flex-col relative text-center items-center justify-center h-fit ring-my-ring ring-1 rounded-lg p-3 bg-my-bg-dark text-white">
        <img
          src={
            profile
              ? profile
              : "https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
          }
          alt=""
          className="w-28 rounded-full mt-3 border-2 border-violet-700"
        />
        <h1 className="font-bold text-3xl">{name}</h1>
        <small>{bio}</small>
        <button
          onClick={() => {
            createChat(userID as string);
          }}
          className="bg-primary font-bold text-white w-full rounded-md my-2"
        >
          CHAT
        </button>
        <span
          onClick={() => {
            setCurrentRating(tutorRatings.find((e) => e.tutorId === userID));
            setRateTutuorId(userID as string);
          }}
          className="text-blue-600 cursor-pointer hover:underline absolute top-2 right-4"
        >
          Rate?
        </span>
      </div>
    </>
  );
}

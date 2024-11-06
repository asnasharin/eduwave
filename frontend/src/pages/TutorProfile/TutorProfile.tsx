import NavBar from "../../components/NavBar/NavBar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useEffect } from "react";
import { getStudentProfile } from "../../features/users/userService";
import Loader from "../../components/Loader/Loader1/Loader";
import TutorProfileCard from "../../components/TutorProfileCard/TutorProfileCard";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function TuroProfile() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getStudentProfile());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <NavBar role="TUTOR" />
      <div className="flex md:py-5 md:px-44 flex-col p-4 gap-10 bg-secondary">
        <div className="flex items-center">
          <Link to={"/"} className="font-bold text-white">
            <ChevronLeftIcon className="mb-1" /> Back
          </Link>
        </div>
        <ProfileCard />
        <TutorProfileCard />
      </div>
    </>
  );
}

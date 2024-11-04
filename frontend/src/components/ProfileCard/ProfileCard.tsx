import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import EditIcon from "@mui/icons-material/Edit";
import CropModal from "../Modal/CropModal";
import { uploadProfile } from "../../features/users/userService";
import ResetPasswordModal from "../Modal/ResetPassword";

// firebase
import { storage } from "../../app/firebase";
import { ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";

export default function ProfileCard() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.userProfile);
  const { user } = useAppSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState<File>();
  const [cropDone, setCropDone] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);

  useEffect(() => {
    if (cropDone && croppedImage) {
      if (profile?.profile) {
        const imageRef = ref(storage, profile.profile);
        deleteObject(imageRef)
          .then(() => {})
          .catch((error) => {
            toast.error(error.message);
          });
      }
      dispatch(uploadProfile(croppedImage));
    }
  }, [cropDone, croppedImage, dispatch, profile?.profile]);

  return (
    <>
      <CropModal
        setCroppedImage={setCroppedImage}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setCropDone={setCropDone}
      />
      <ResetPasswordModal
        setOpenResetModal={setOpenResetModal}
        openResetModal={openResetModal}
      />
      <div className="flex bg-[#302343] shadow-md relative flex-wrap items-center justify-center w-full h-fit gap-7 ring-1 py-5 ring-[#4d2389] rounded-xl">
        <div className="img-wrapper sm:mt-0 mt-5 relative">
          <img
            src={
              profile?.profile
                ? profile.profile
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            }
            className="rounded-full m-0 w-40 ring-1 ring-[#9747FF] "
            alt=""
          />
          <div
            onClick={() => setOpenModal(true)}
            className="bg-[#372450] rounded-full text-[#9747FF] absolute  top-3 right-3 p-2 ring-1 ring-[#9747FF] cursor-pointer hover:shadow-lg"
          >
            <EditIcon />
          </div>
        </div>
        <div className="space-y-1 flex text-white text-xl flex-col  md:mr-16 justify-center md:justify-start">
          <h1 className="font-bold text-4xl">{profile?.name}</h1>
          <h1>{user?.email}</h1>
          <h1>{profile?.phone}</h1>
        </div>
        <button
          className="absolute top-3 right-5 text-blue-600"
          onClick={() => setOpenResetModal(true)}
        >
          Reset Password?
        </button>
      </div>
    </>
  );
}

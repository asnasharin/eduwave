import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { googleAuth } from "../../features/auth/authService";
import { useEffect, useState } from "react";
import { reset } from "../../features/auth/authSlice";
import Loader from "../Loader/Loader1/Loader";
import { useNavigate } from "react-router-dom";

type prop = {
  method: string;
  role: string;
};

export default function GoogleAuth({ method, role }: prop) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const { isLoading, isError, user, isSuccess, errorMessage } = useAppSelector(
    (state) => state.auth
  );

  const [data, setData] = useState({
    accessToken: "",
    role: "",
  });

  useEffect(() => {
    if (isSuccess) {
      if (user?.role === "STUDENT") {
        navigate("/student");
      } else if (user?.role === "TUTOR") {
        navigate("/tutor");
      }
      dispatch(reset());
    }
  }, [errorMessage, isError, isSuccess, navigate, dispatch, user]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      setData({
        accessToken: accessToken,
        role: role,
      });
      setIsSubmit(true);
    },
  });

  useEffect(() => {
    if (isSubmit && data.accessToken && data.role) {
      dispatch(googleAuth(data));
    }
    setIsSubmit(false);
  }, [data, dispatch, isSubmit]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <button
      onClick={() => login()}
      className="flex gap-2 w-[70%] items-center shadow font-medium text-slate-700 border py-1 justify-center rounded-md"
    >
      <img
        width="25"
        height="25"
        src="https://img.icons8.com/color/48/google-logo.png"
      />
      {method} with Google
    </button>
  );
}

import { useEffect, useState } from "react";
import { validate } from "../util/validateForms";
import AskTutorStudent from "../Modal/AskTutorStudent";
import { login } from "../../features/auth/authService";
import { useAppDispatch, useAppSelector } from "../../app/store";
import Loader from "../Loader/Loader1/Loader";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";
import LoginSVG from "../../assets/LoginSVG.svg";
import { toast } from "react-toastify";
import Loader3 from "../Loader/Loader3/Loader";

type roleProp = { role: string };
export default function Login({ role }: roleProp) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, user, errorMessage, isSuccess } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({
      ...formError,
      email: validate("email", formData.email),
      password: validate("passwordLogin", formData.password),
    });
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && !formError.email && !formError.password) {
      dispatch(login(formData));
      setIsSubmit(false);
      dispatch(reset());
    }
  }, [formError, dispatch, formData, isSubmit]);

  useEffect(() => {
    if (isSuccess) {
      if (user?.role === "TUTOR") {
        navigate("/tutor");
      } else if (user?.role === "STUDENT") {
        navigate("/student");
      } else if (user?.role === "ADMIN") {
        navigate("/admin");
      }
      setIsSubmit(false);
      dispatch(reset());
    }
    if (
      (isError && (errorMessage.status as number) > 500) ||
      errorMessage.status === 404
    ) {
      setIsSubmit(false);
      toast.error(errorMessage.message);
      dispatch(reset());
    }
  }, [isSuccess, user, navigate, dispatch, isError, errorMessage]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AskTutorStudent setOpenModal={setOpenModal} openModal={openModal} />
      <div className="flex justify-center items-center bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end h-[100vh] md:px-72 px-4 w-full">
        <div className="relative w-full flex justify-between bg-white  rounded-3xl">
          <img
            className="absolute hidden top-0 right-0 w-64 md:inline-flex"
            src={LoginSVG}
            alt=""
          />
          <div className="flex flex-col items-center w-[100%]">
            <h1 className="text-primary font-black text-5xl mt-9 mb-2">
              LOGIN
            </h1>
            {/* {role === "PUBLIC" && <GoogleAuth method={"Login"} role="PUBLIC" />} */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start mt-1 w-[70%]"
            >
              {isError && (
                <small className="text-red-600 rounded-sm mt-2 bg-red-100 w-[100%] text-center">
                  {errorMessage.message}
                </small>
              )}
              <label htmlFor="name" className="text-primary font-medium mt-2">
                Email
              </label>
              <input
                type="email"
                id="name"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="w-[100%] text-xs h-8 rounded-md"
              />
              {formError.email && (
                <small className="text-red-700">{formError.email}</small>
              )}
              <label htmlFor="name" className="text-primary font-medium mt-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="name"
                value={formData.password}
                placeholder="Enter your Password"
                onChange={handleChange}
                className="w-[100%] text-xs h-8 rounded-md"
              />
              {formError.password && (
                <small className="text-red-700">{formError.password}</small>
              )}
              {!isLoading ? (
                <button className="bg-primary h-8 w-[100%] md:w-[50%] mt-4 rounded-md text-white text-base font-medium">
                  SUBMIT
                </button>
              ) : (
                <>
                  <div className="bg-primary flex items-center justify-center h-8 w-[100%] md:w-[50%] mt-4 rounded-md text-white text-base font-medium">
                    <Loader3 />
                  </div>
                </>
              )}
              <small className="font-semibold mt-3 mb-8 text-blue-500">
                Dont't have account?
                <span
                  onClick={() => setOpenModal(true)}
                  className="font-bold underline cursor-pointer"
                >
                  {" "}
                  signup
                </span>
              </small>
            </form>
          </div>
          <div className="bg-primary w-60 left-20 hidden md:inline-flex rounded-3xl"></div>
        </div>
      </div>
    </>
  );
}

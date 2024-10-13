import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { validate } from "../util/validateForms.ts";
import { userData } from "../../types/authTypes";
// import SignupOTPmodal from "../Modal/SignupOTPModal.ts";
import api from "../../Api/api";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../app/store.ts";
import Loader from "../Loader/Loader1/Loader";
import { signup } from "../../features/auth/authService.ts";
import { reset } from "../../features/auth/authSlice.ts";
import SignupSVG from "../../assets/Signup.svg";
import { toast } from "react-toastify";

type Props = {
  role: string;
};

export default function Signup({ role }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, user, errorMessage, isSuccess } = useAppSelector(
    (state) => state.auth
  );
  const [formSubmit, setFormSubmit] = useState(false);

  const [isviewPass, setIsviewPass] = useState(false);
  const viewPassword = () => {
    setIsviewPass((pre) => !pre);
  };

  const [userData, setUserData] = useState<userData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: role,
  });
  const [confirmpass, setconfirmpass] = useState<string>("");
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setconfirmpass(e.target.value);
  };

  const [formError, setFormError] = useState<userData>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [serverError, setServerError] = useState("");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isSubmit, setisSubmit] = useState<boolean>(false);
  const [sendOTP, setSendOTP] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({
      ...formError,
      name: validate("name", userData.name),
      email: validate("email", userData.email),
      phone: validate("phone", userData.phone),
      password: validate("password", userData.password),
    });

    if (formError.password === "" && confirmpass !== userData.password) {
      setFormError({
        ...formError,
        password: "password not matching",
      });
    }
    setSendOTP(true);
  };

  useEffect(() => {
    if (
      !formError.name &&
      !formError.email &&
      !formError.password &&
      !formError.phone &&
      userData.email.length > 0 &&
      userData.password.length > 0 &&
      userData.phone.length > 0 &&
      userData.name.length > 0 &&
      sendOTP
    ) {
      (async function () {
        try {
          const response = await api.post("/verify-email", {
            email: userData.email,
          });
          if (response.data.success) {
            setisSubmit(true);
            setServerError("");
            setOpenModal(true);
          }
        } catch (error) {
          const message = error as AxiosError;
          const Error = (message?.response?.data as { message: string })
            .message;
          setisSubmit(false);
          setServerError(Error);
          setOpenModal(false);
        }
      })();
    }
  }, [formError, userData, sendOTP]);

  useEffect(() => {
    if (formSubmit) {
      dispatch(signup(userData));
      dispatch(reset());
    }
    setFormSubmit(false);
  }, [dispatch, userData, formSubmit]);

  useEffect(() => {
    if (isSuccess) {
      if (user?.role === "STUDENT") {
        navigate("/student");
      } else if (user?.role === "TUTOR") {
        navigate("/tutor");
      }
      dispatch(reset());
    }
    if (
      (isError && (errorMessage.status as number) >= 500) ||
      errorMessage.status === 404
    ) {
      toast.error(errorMessage.message);
      dispatch(reset());
    }
  }, [isSuccess, navigate, isError, user, dispatch, errorMessage]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {/* <SignupOTPmodal
        openModal={openModal}
        setOpenModal={setOpenModal}
        email={userData.email}
        isSubmit={isSubmit}
        setFormSubmit={setFormSubmit}
      /> */}
      <div className="flex justify-center items-center bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end h-[100vh]  md:px-72 px-4 w-full">
        <div className="w-[100%] relative flex justify-between bg-white rounded-3xl">
          <div className="bg-primary w-72 left-20 hidden md:inline-flex rounded-3xl"></div>
          <div className="flex flex-col items-center w-[100%]">
            <h1 className="text-primary font-black text-5xl mt-9 mb-2">
              SIGNUP
            </h1>
            {/* <GoogleAuth method="Sign Up" role={role} /> */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start w-[70%]"
            >
              {serverError && (
                <small className="text-red-600 rounded-sm mt-2 bg-red-100 w-[100%] text-center">
                  {serverError}
                </small>
              )}
              {isError && (
                <small className="text-red-600 rounded-sm mt-2 bg-red-100 w-[100%] text-center">
                  {errorMessage.message}
                </small>
              )}
              <label htmlFor="name" className="text-primary font-medium mt-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Name"
                className="w-[100%] text-xs h-8 rounded-md"
                value={userData.name}
                onChange={handleChange}
              />
              {formError.name && (
                <small className="text-red-700">{formError.name}</small>
              )}
              <div className="grid grid-cols-2 justify-between w-[100%] gap-3 mt-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="text-primary font-medium mt-2"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="name"
                    placeholder="Enter your Email"
                    className="w-[100%] text-xs h-8 rounded-md"
                    value={userData.email}
                    onChange={handleChange}
                  />
                  {formError.email && (
                    <small className="text-red-700">{formError.email}</small>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="text-primary font-medium mt-2"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="name"
                    name="phone"
                    onChange={handleChange}
                    value={userData.phone}
                    placeholder="Enter your Phone Number"
                    className="w-[100%] text-xs h-8 rounded-md"
                  />
                  {formError.phone && (
                    <small className="text-red-700">{formError.phone}</small>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1 relative">
                  <label
                    htmlFor="name"
                    className="text-primary font-medium mt-2"
                  >
                    Password
                  </label>
                  <input
                    type={isviewPass ? "text" : "password"}
                    id="name"
                    name="password"
                    onChange={handleChange}
                    value={userData.password}
                    placeholder="Enter your password"
                    className="w-[100%] text-xs h-8 rounded-md"
                  />
                  {formError.password && (
                    <small className="text-red-700">{formError.password}</small>
                  )}
                  {isviewPass ? (
                    <RemoveRedEyeIcon
                      onClick={viewPassword}
                      className="absolute right-3 top-8 cursor-pointer"
                      sx={{ fontSize: 15 }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={viewPassword}
                      className="absolute right-3 top-8 cursor-pointer"
                      sx={{ fontSize: 15 }}
                    />
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="text-primary font-medium mt-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="name"
                    // value={confirmpass}
                    // onChange={onchange}
                    placeholder="Confirm Password"
                    className="w-[100%] text-xs h-8 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <button className="bg-primary py-2 w-[100%] rounded-md text-white text-base font-medium">
                    SUBMIT
                  </button>
                </div>
              </div>
              <Link to={"/login"} className="text-blue-500 text-sm mt-1 mb-5">
                Already have account? login
              </Link>
            </form>
          </div>
          <img
            className="absolute hidden top-0 left-0 md:inline-flex"
            src={SignupSVG}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

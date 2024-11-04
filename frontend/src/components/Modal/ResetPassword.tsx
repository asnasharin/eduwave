import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { validate } from "../util/validateForms";
import api from "../../Api/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type prop = {
  openResetModal: boolean;
  setOpenResetModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ResetPasswordModal({
  openResetModal,
  setOpenResetModal,
}: prop) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [showReset, setShowReset] = useState(true);
  const [serverError, setServerError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    newPass: "",
    confirmPass: "",
  });

  const [formErrors, setFormError] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormError({
      ...formErrors,
      currentPass: validate("passwordLogin", currentPassword),
    });
    setFormSubmit(true);
  };
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const matchPass = (pass1: string, pass2: string) => {
    if (pass1 !== pass2) return "Password is't Matching";
    return "";
  };

  const finalSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormError({
      ...formErrors,
      newPass: validate("password", formData.newPass),
      confirmPass:
        validate("password", formData.confirmPass) ||
        matchPass(formData.confirmPass, formData.newPass),
    });
    setIsSubmit(true);
  };

  // for checlking current password
  useEffect(() => {
    (async function () {
      try {
        if (formSubmit && !formErrors.currentPass) {
          const response = await api.post(
            "/resetPassword",
            { currentPassword },
            { withCredentials: true }
          );
          if (response.data.success) {
            setServerError("");
            setShowReset(false);
          }
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        const Error = (axiosError?.response?.data as { message: string })
          .message;
        setServerError(Error);
      }
    })();
  }, [currentPassword, formErrors.currentPass, formSubmit]);

  // for reseting the password
  useEffect(() => {
    (async function () {
      try {
        if (isSubmit && !formErrors.newPass && !formErrors.confirmPass) {
          const response = await api.patch(
            "/resetPassword",
            { newPassworrd: formData.newPass },
            { withCredentials: true }
          );
          if (response.data.success) {
            toast.success("Password Reset Successfull");
            setOpenResetModal(false);
          }
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        const Error = (axiosError?.response?.data as { message: string })
          .message;
        setServerError(Error);
      }
    })();
  }, [
    formErrors.confirmPass,
    formErrors.newPass,
    formData.newPass,
    isSubmit,
    setOpenResetModal,
  ]);

  return (
    <>
      <Modal
        show={openResetModal}
        size="md"
        onClose={() => setOpenResetModal(false)}
        popup
      >
        {showReset && <Modal.Header />}
        <Modal.Body>
          {showReset ? (
            <>
              <div className="flex flex-col">
                <div className="flex justify-center w-full rounded bg-red-100">
                  {serverError && (
                    <small className=" text-red-600">{serverError}</small>
                  )}
                </div>
                <label htmlFor="password" className="font-bold">
                  Enter your Current password
                </label>
                {formErrors.currentPass && (
                  <small className="text-red-600 ml-2">
                    {formErrors.currentPass}
                  </small>
                )}
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="rounded-md w-full mt-3"
                />

                <button
                  onClick={handleClick}
                  className="w-full bg-primary rounded-md mt-3 text-white py-2"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-5">
                <div className="flex justify-center w-full rounded bg-red-100">
                  {serverError && (
                    <small className=" text-red-600">{serverError}</small>
                  )}
                </div>
                <label htmlFor="password" className="font-bold">
                  Enter new password
                </label>
                {formErrors.newPass && (
                  <small className="text-red-600 ml-2">
                    {formErrors.newPass}
                  </small>
                )}
                <input
                  type="password"
                  value={formData.newPass}
                  className="rounded-md w-full mt-3"
                  name="newPass"
                  onChange={onchange}
                />
                <label htmlFor="password" className="font-bold">
                  Confirm Password
                </label>
                {formErrors.confirmPass && (
                  <small className="text-red-600 ml-2">
                    {formErrors.confirmPass}
                  </small>
                )}
                <input
                  type="password"
                  value={formData.confirmPass}
                  className="rounded-md w-full mt-3"
                  name="confirmPass"
                  onChange={onchange}
                />

                <button
                  onClick={finalSubmit}
                  className="w-full bg-primary rounded-md mt-3 text-white py-2"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

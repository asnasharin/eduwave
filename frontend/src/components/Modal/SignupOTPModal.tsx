import { Label, Modal, TextInput } from "flowbite-react";
import { SetStateAction, Dispatch, useState, useEffect } from "react";
import api from "../../Api/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type Prop = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  email: string;
  isSubmit: boolean;
  setFormSubmit: Dispatch<SetStateAction<boolean>>;
};

export default function SignupOTPmodal({
  setOpenModal,
  openModal,
  email,
  isSubmit,
  setFormSubmit,
}: Prop) {
  const [otp, setOtp] = useState("");

  const [serverError, setServerError] = useState("");
  const [timer, setTimer] = useState(60);
  let intervel: string | number | NodeJS.Timeout | undefined;
  useEffect(() => {
    if (timer > 0 && isSubmit) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      intervel = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervel);
    };
  });

  const handleclick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (otp.trim().length > 0) {
      (async function () {
        try {
          const response = await api.post("/verify-otp", {
            email: email,
            otp: otp,
          });
          if (response.data.success) {
            toast(response.data.message);
            setServerError("");
            setOpenModal(false);
            setFormSubmit(true);
          } else {
            setServerError(response.data.message);
          }
        } catch (error) {
          const Error = error as AxiosError;
          const message: { success: boolean; message: string } = Error?.response
            ?.data as { success: boolean; message: string };
          setServerError(message.message);
        }
      })();
    }
  };

  const resendOTP = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (timer === 0) {
      (async function () {
        try {
          const response = await api.post("/verify-email", {
            email: email,
          });
          setTimer(60);
          if (response.data.success) {
            toast(response.data.message);
          }
        } catch (error) {
          const Error = error as AxiosError;
          const message: { success: boolean; message: string } = Error?.response
            ?.data as { success: boolean; message: string };
          setServerError(message.message);
        }
      })();
    }
  };

  return (
    <>
      <Modal
        show={openModal}
        size={"sm"}
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-4">
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Enter the OTP sent to {email.split("@")[0].slice(0, 4)}********@
              {email.split("@")[1]}
            </h3>
            <div>
              {serverError && (
                <div className="w-full bg-red-100 text-center rounded-sm">
                  <small className="py- text-red-600">{serverError} </small>
                </div>
              )}
              <div className="mb-2 block">
                <Label htmlFor="email" value="Enter OTP" />
              </div>
              <TextInput
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                id="number"
                placeholder="eg:456436"
              />
            </div>
            <button
              onClick={handleclick}
              className="bg-primary w-full py-2 rounded-md text-white font-medium"
            >
              Submit
            </button>
            <div>
              {timer > 0 ? (
                <span className="font-semibold text-gray-600">
                  Resend OTP within{" "}
                  <span className="font-bold text-blue-500">{timer}s</span>
                </span>
              ) : (
                <span
                  className="text-blue-500 font-semibold cursor-pointer"
                  onClick={resendOTP}
                >
                  Resend OTP
                </span>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

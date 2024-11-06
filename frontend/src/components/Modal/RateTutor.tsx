import { Modal } from "flowbite-react";
import Rating from "@mui/material/Rating";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Irating } from "../../types/ratingTypes";
import { validate } from "../util/validateForms";
import api from "../../Api/api";
import { toast } from "react-toastify";

type Prop = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setRateTutuorId: Dispatch<SetStateAction<string>>;
  setUpdated: Dispatch<SetStateAction<boolean>>;
  currentRating: Irating | undefined;
  rateTutorId: string;
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function RateTutor({
  openModal,
  setOpenModal,
  currentRating,
  rateTutorId,
  setRateTutuorId,
  setUpdated,
}: Prop) {
  const [ratingData, setRatinigData] = useState<Irating>({
    rating: currentRating ? currentRating.rating : 0,
    review: currentRating ? currentRating.review : "",
  });

  const [formError, setFormError] = useState({
    review: "",
    rating: "",
  });
  const [submit, setSubmit] = useState<boolean>(false);

  useEffect(() => {
    setRatinigData({
      ...ratingData,
      rating: currentRating ? currentRating.rating : 0,
      review: currentRating ? currentRating.review : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRating]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormError({
      review: validate("review", ratingData.review),
      rating: validate("required", ratingData.rating),
    });
    setSubmit(true);
  };

  // update rating
  useEffect(() => {
    (async function () {
      if (
        submit &&
        !formError.rating &&
        !formError.review &&
        rateTutorId &&
        ratingData.rating &&
        ratingData.review
      ) {
        try {
          const { data } = await api.post(
            "/rating",
            {
              rating: ratingData.rating,
              review: ratingData.review,
              _id: rateTutorId,
            },
            { withCredentials: true }
          );
          if (data.success) {
            toast.success("rated tutor successfuly!");
            setUpdated((e) => !e);
            setRateTutuorId("");
            setOpenModal(false);
            setSubmit(false);
          }
        } catch (err) {
          setSubmit(false);
        }
      }
    })();
  }, [
    formError,
    ratingData,
    submit,
    rateTutorId,
    setOpenModal,
    setSubmit,
    setRateTutuorId,
    setUpdated,
  ]);

  return (
    <Modal
      show={openModal}
      onClose={() => {
        setRateTutuorId("");
        setRatinigData({
          ...ratingData,
          rating: currentRating ? currentRating.rating : 0,
          review: currentRating ? currentRating.review : "",
        });
        setOpenModal(false);
      }}
    >
      <Modal.Header className="ring-1 ring-[#4d2389] bg-[#110d17]  rounded-t-md">
        <h1 className="text-white">Rate this tutor</h1>
      </Modal.Header>
      <Modal.Body className="ring-1 ring-[#4d2389] flex space-y-6 flex-col bg-[#110d17] rounded-b-md">
        {formError.rating && (
          <small className="text-red-600">{formError.rating}</small>
        )}
        <ThemeProvider theme={darkTheme}>
          <Rating
            name="size-large"
            value={ratingData.rating}
            size="large"
            onChange={(_event, newValue) => {
              setRatinigData({
                ...ratingData,
                rating: newValue,
              });
            }}
          />
        </ThemeProvider>
        {formError.review && (
          <small className="text-red-600">{formError.review}</small>
        )}
        <input
          type="text"
          value={ratingData.review}
          onChange={(e) => {
            setRatinigData({
              ...ratingData,
              review: e.target.value,
            });
          }}
          className="bg-my-input rounded-md ring-1 outline-none border-0 text-gray-300"
        />
        <button
          onClick={handleSubmit}
          className="bg-primary  text-white py-2 rounded-lg hover:bg-my-ring"
        >
          submit
        </button>
      </Modal.Body>
    </Modal>
  );
}

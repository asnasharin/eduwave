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
  setUpdated: Dispatch<SetStateAction<boolean>>;
  setRateCouresId: Dispatch<SetStateAction<string>>;
  currentRating: Irating | undefined;
  rateCouresId: string;
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function RateCouresModal({
  openModal,
  setOpenModal,
  currentRating,
  setRateCouresId,
  rateCouresId,
  setUpdated,
}: Prop) {
  const [ratingData, setRatingData] = useState<Irating>({
    rating: currentRating ? currentRating.rating : 0,
    review: currentRating ? currentRating.review : "",
  });
  const [submit, setSubmit] = useState<boolean>(false);

  const [formError, setFormError] = useState({
    review: "",
    rating: "",
  });

  useEffect(() => {
    if (currentRating) {
      setRatingData(currentRating);
    }
  }, [currentRating]);

  const handleSubmit = () => {
    setFormError({
      ...formError,
      rating: validate("required", ratingData.rating),
      review: validate("review", ratingData.review),
    });
    setSubmit(true);
  };
  useEffect(() => {
    (async function () {
      if (
        !formError.rating &&
        !formError.review &&
        ratingData.rating &&
        submit
      ) {
        try {
          const { data } = await api.post("rating/course", {
            rating: ratingData.rating,
            review: ratingData.review,
            _id: rateCouresId,
          });
          if (data.success) {
            toast.success("Coures Rating added!");
            setSubmit(false);
            setUpdated((e) => !e);
            setOpenModal(false);
          }
        } catch (_err) {
          setSubmit(false);
          toast.error("Error");
        }
      }
    })();
  }, [ratingData, rateCouresId, formError, submit, setOpenModal, setUpdated]);

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => {
          setRateCouresId("");
          setRatingData({
            ...ratingData,
            rating: currentRating ? currentRating.rating : 0,
            review: currentRating ? currentRating.review : "",
          });
          setOpenModal(false);
          setSubmit(false);
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
                setRatingData({
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
              setRatingData({
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
    </>
  );
}

import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IAssessment, IQuesion } from "../../../types/assessment";
import QuestionModal from "../QuestionModal/QuestionModal";
import Swal from "sweetalert2";
import EditQuestionModal from "../QuestionModal/EditQuestionModal";
import { validate } from "../../util/validateForms";
import api from "../../../Api/api";
import { toast } from "react-toastify";
import Loader3 from "../../Loader/Loader3/Loader";

type Prop = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  courseId: string;
};
export default function CreateAssessment({
  openModal,
  setOpenModal,
  courseId,
}: Prop) {
  const [openQuestionModal, setOpenQuestionModal] = useState<boolean>(false);
  const [openEditQuestionModal, setOpenEditQuestionModal] =
    useState<boolean>(false);
  const [editQuestionId, setEditQueationId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [minimumMark, setMinimumMark] = useState<string>("");
  const [assessment, setAssessment] = useState<IAssessment>({
    minimumMark: null,
    questions: [],
  });
  const [questions, setQuestions] = useState<IQuesion[]>(assessment.questions);
  useEffect(() => {
    setQuestions(assessment.questions);
    setMinimumMark(assessment.minimumMark as unknown as string);
  }, [assessment]);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get(`/assessment/${courseId}`);
        if (data.success) {
          setAssessment(data.assessment);
        }
      } catch (_err) {
        toast.error("Error");
      }
    })();
  }, [courseId, updated]);

  const [formError, setFormError] = useState<{
    minimumMark: string;
    Questions: string;
  }>({
    minimumMark: "",
    Questions: "",
  });

  const deleteQuestion = (id: string) => {
    Swal.fire({
      title: "Are you sure",
      text: "are you sure want delet this Question?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "YES DELETE",
    }).then((result) => {
      if (result.isConfirmed) {
        setQuestions(questions.filter((e) => e.id !== id));
      }
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormError({
      ...formError,
      minimumMark: validate("percentage", minimumMark),
      Questions: questions.length > 0 ? "" : "Atleast one question is required",
    });
    setSubmit(true);
  };

  useEffect(() => {
    setFormError({
      ...formError,
      Questions: questions.length > 0 ? "" : "Atleast one question is required",
    });
    setSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  useEffect(() => {
    (async function () {
      if (
        courseId &&
        submit &&
        !formError.Questions &&
        !formError.minimumMark &&
        minimumMark &&
        questions.length > 0
      ) {
        try {
          setLoading(true);
          const { data } = await api.post("/assessment", {
            courseId: courseId,
            questions: questions,
            minimumMark: minimumMark,
          });
          if (data.success) {
            toast.success("Assessment created!");
            setSubmit(false);
            setOpenModal(false);
            setUpdated((e) => !e);
            setLoading(false);
          }
        } catch (_err) {
          toast.error("Error");
          setSubmit(false);
          setLoading(false);
        }
      }
    })();
  }, [submit, courseId, formError, minimumMark, questions, setOpenModal]);

  return (
    <>
      <QuestionModal
        openModal={openQuestionModal}
        setOpenModal={setOpenQuestionModal}
        setQuestions={setQuestions}
        questions={questions}
      />
      <EditQuestionModal
        openModal={openEditQuestionModal}
        setOpenModal={setOpenEditQuestionModal}
        questions={questions}
        setQuestions={setQuestions}
        edtiQuestionId={editQuestionId}
        setEditQueationId={setEditQueationId}
      />
      <Modal
        size={"4xl"}
        show={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Modal.Header className="ring-1 ring-[#4d2389] bg-[#110d17] rounded-t-md">
          <h1 className="text-white font-bold">Create Assessment</h1>
        </Modal.Header>
        <Modal.Body className="bg-[#110d17] flex flex-col items-center text-gray-200 ring-1 ring-[#4d2389] rounded-b-md">
          <div className="w-full flex justify-end">
            <button
              onClick={() => setOpenQuestionModal(true)}
              className="text-gray-200 w-2/12 mt-1 rounded h-10 bg-primary"
            >
              Add Question
            </button>
          </div>
          <h1>Questions</h1>
          {formError.Questions && (
            <small className="text-red-500">{formError.Questions}</small>
          )}
          <div className="flex flex-col w-full gap-3 mt-3">
            {questions.map((e, i) => (
              <div className="w-full p-2 h-fit ring-1 ring-gray-800 rounded-lg">
                <div className="flex justify-between w-full">
                  <h1 className="font-bold text-xl">
                    {i + 1}: {e.question}
                  </h1>
                  <div className="flex gap-4 me-2">
                    <button
                      onClick={() => {
                        setEditQueationId(e.id as string);
                        setOpenEditQuestionModal(true);
                      }}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteQuestion(e.id as string)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="ms-4 flex gap-9">
                  <div className="">
                    <h1 className=" text-gray-400">A: {e.optionA}</h1>
                    <h1 className=" text-gray-400">B: {e.optionB}</h1>
                  </div>
                  <div className="">
                    <h1 className=" text-gray-400">C: {e.optionC}</h1>
                    <div className="flex items-end">
                      <h1 className=" text-gray-400">D: {e.optionD}</h1>
                      <small className="ms-5 text-gray-300">
                        score: {e.mark}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full mt-4 gap-3 items-end">
            <div className="flex gap-1 flex-col w-8/12">
              <label htmlFor="minimumMark">Minimum Mark percentage</label>
              {formError.minimumMark && (
                <small className="text-red-500">{formError.minimumMark}</small>
              )}
              <input
                type="number"
                id="minimumMark"
                value={minimumMark}
                onChange={(e) => {
                  setSubmit(false);
                  setMinimumMark(e.target.value);
                }}
                placeholder="Minimum percetage required for passing the test, eg: 30"
                className=" bg-my-input outline-none  border-0 rounded-lg text-gray-200"
              />
            </div>
            {!loading ? (
              <button
                onClick={handleSubmit}
                className="w-4/12 h-10 font-bold mt-3 rounded-md bg-primary"
              >
                SUBMIT
              </button>
            ) : (
              <div className="w-4/12 h-10 flex items-center justify-center font-bold mt-3 rounded-md bg-primary">
                <Loader3 />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

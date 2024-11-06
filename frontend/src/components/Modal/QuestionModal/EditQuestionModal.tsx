import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IQuesion } from "../../../types/assessment";
import { validate } from "../../util/validateForms";

type Prop = {
  openModal: boolean;
  questions: IQuesion[];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setQuestions: Dispatch<SetStateAction<IQuesion[]>>;
  setEditQueationId: Dispatch<SetStateAction<string>>;
  edtiQuestionId: string;
};

export default function EditQuestionModal({
  openModal,
  setOpenModal,
  questions,
  setQuestions,
  edtiQuestionId,
  setEditQueationId,
}: Prop) {
  const [formData, setFormData] = useState<IQuesion>(
    edtiQuestionId
      ? (questions.find((e) => e.id === edtiQuestionId) as IQuesion)
      : {
          answer: "",
          question: "",
          mark: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
        }
  );

  useEffect(() => {
    if (edtiQuestionId) {
      setFormData(questions.find((e) => e.id === edtiQuestionId) as IQuesion);
    }
  }, [edtiQuestionId, questions]);

  const [formErrors, setFormErrors] = useState<IQuesion>({
    question: "",
    mark: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
  });
  const onchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (formData.question) {
      setFormErrors({
        ...formErrors,
        question: validate("required", formData.question),
      });
    }
    if (formData.answer) {
      setFormErrors({
        ...formErrors,
        answer: validate("required", formData.answer),
      });
    }
    if (formData.optionA) {
      setFormErrors({
        ...formErrors,
        optionA: validate("required", formData.optionA),
      });
    }
    if (formData.optionB) {
      setFormErrors({
        ...formErrors,
        optionB: validate("required", formData.optionB),
      });
    }
    if (formData.optionC) {
      setFormErrors({
        ...formErrors,
        optionC: validate("required", formData.optionC),
      });
    }
    if (formData.optionD) {
      setFormErrors({
        ...formErrors,
        optionD: validate("required", formData.optionD),
      });
    }
    if (formData.mark) {
      setFormErrors({
        ...formErrors,
        mark: validate("mark", formData.mark),
      });
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormErrors({
      question: validate("required", formData.question),
      answer: validate("required", formData.answer),
      mark: validate("mark", formData.mark),
      optionA: validate("required", formData.optionA),
      optionB: validate("required", formData.optionB),
      optionC: validate("required", formData.optionC),
      optionD: validate("required", formData.optionD),
    });
    if (
      formData.question &&
      formData.answer &&
      formData.mark &&
      formData.optionA &&
      formData.optionB &&
      formData.optionC &&
      formData.optionD &&
      !formErrors.question &&
      !formErrors.answer &&
      !formErrors.mark &&
      !formErrors.optionA &&
      !formErrors.optionB &&
      !formErrors.optionC &&
      !formErrors.optionD
    ) {
      setQuestions(
        questions.map((item) => {
          if (item.id === edtiQuestionId) {
            item.mark = formData.mark;
            item.question = formData.question;
            item.answer = formData.answer;
            item.optionA = formData.optionA;
            item.optionB = formData.optionB;
            item.optionC = formData.optionC;
            item.optionD = formData.optionD;
          }
          return item;
        })
      );
      setOpenModal(false);
      setEditQueationId("");
    }
  };

  const checkAnswer = (ans: string) => {
    switch (ans) {
      case formData.optionA:
        return "optionA";
      case formData.optionB:
        return "optionB";
      case formData.optionC:
        return "optionC";
      case formData.optionD:
        return "optionD";
    }
  };
  return (
    <>
      <Modal
        show={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Modal.Header className="ring-1 text-gray-200 ring-[#4d2389] bg-[#110d17] rounded-t-md">
          <h1 className="text-gray-200">Add new Question</h1>
        </Modal.Header>
        <Modal.Body className="bg-[#110d17] text-gray-200 ring-1 ring-[#4d2389] rounded-b-md">
          <form className="grid gap-2 grid-cols-2 w-full">
            <div className="flex flex-col col-span-2">
              <label htmlFor="question" className="text-gray-200">
                Question
              </label>
              {formErrors.question && (
                <small className="text-red-600">{formErrors.question}</small>
              )}
              <input
                type="text"
                id="question"
                value={formData.question}
                onChange={onchange}
                name="question"
                placeholder="Question"
                className="bg-my-input rounded border-0 outline-0"
              />
            </div>
            <label htmlFor="option" className="text-gray-200 col-span-2">
              Options
            </label>
            <div className=" md:col-span-1 flex flex-col col-span-2">
              {formErrors.optionA && (
                <small className="text-red-600">{formErrors.optionA}</small>
              )}
              <input
                value={formData.optionA}
                onChange={onchange}
                name="optionA"
                type="text"
                placeholder="Option A"
                className="bg-my-input rounded border-0 outline-0 md:col-span-1 col-span-2"
              />
            </div>
            <div className=" md:col-span-1 flex flex-col col-span-2">
              {formErrors.optionB && (
                <small className="text-red-600">{formErrors.optionB}</small>
              )}
              <input
                value={formData.optionB}
                onChange={onchange}
                name="optionB"
                type="text"
                placeholder="Option B"
                className="bg-my-input rounded border-0 outline-0 md:col-span-1 col-span-2"
              />
            </div>
            <div className=" md:col-span-1 flex flex-col col-span-2">
              {formErrors.optionC && (
                <small className="text-red-600">{formErrors.optionC}</small>
              )}
              <input
                value={formData.optionC}
                onChange={onchange}
                name="optionC"
                type="text"
                placeholder="Option C"
                className="bg-my-input rounded border-0 outline-0 md:col-span-1 col-span-2"
              />
            </div>
            <div className=" md:col-span-1 flex flex-col col-span-2">
              {formErrors.optionD && (
                <small className="text-red-600">{formErrors.optionD}</small>
              )}
              <input
                value={formData.optionD}
                onChange={onchange}
                name="optionD"
                type="text"
                placeholder="option D"
                className="bg-my-input rounded border-0 outline-0 md:col-span-1 col-span-2"
              />
            </div>

            <div className="flex flex-col md:col-span-1 col-span-2 gap-2">
              <label htmlFor="answer" className="text-gray-200 ">
                Answer
              </label>
              {formErrors.answer && (
                <small className="text-red-600">{formErrors.answer}</small>
              )}
              <select
                name="answer"
                onChange={onchange}
                className="bg-my-input text-gray-200 rounded border-0 outline-0"
              >
                <option value={formData.answer}>
                  {checkAnswer(formData.answer)}
                </option>
                {checkAnswer(formData.answer) !== "optionA" && (
                  <option value={formData.optionA}>Option A</option>
                )}
                {checkAnswer(formData.answer) !== "optionB" && (
                  <option value={formData.optionB}>Option B</option>
                )}
                {checkAnswer(formData.answer) !== "optionC" && (
                  <option value={formData.optionC}>Option C</option>
                )}
                {checkAnswer(formData.answer) !== "optionD" && (
                  <option value={formData.optionD}>Option D</option>
                )}
              </select>
            </div>
            <div className="flex flex-col md:col-span-1 col-span-2 gap-2">
              <label
                htmlFor="answer"
                className="text-gray-200 md:col-span-1 col-span-2"
              >
                Score
              </label>
              {formErrors.mark && (
                <small className="text-red-600">{formErrors.mark}</small>
              )}
              <input
                name="mark"
                value={formData.mark}
                onChange={onchange}
                type="number"
                placeholder="Mark"
                className="bg-my-input rounded border-0 outline-0 md:col-span-1 col-span-2"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-2 rounded-lg bg-primary mt-3 col-span-2 text-gray-200"
            >
              Update Question
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

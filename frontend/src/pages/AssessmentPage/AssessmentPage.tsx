import { useNavigate, useParams } from "react-router-dom";
import StudentNav from "../../components/NavBar/StudentNav";
import { useEffect, useState } from "react";
import { IAssessment, IResponse, SelectedAnswer } from "../../types/assessment";
import api from "../../Api/api";
import Loader from "../../components/Loader/Loader2/Loader";
import Loader3 from "../../components/Loader/Loader3/Loader";
import Swal from "sweetalert2";
import { useAppSelector } from "../../app/store";
import AssessmentSucceess from "../../components/Modal/AssessmentSuccess";
import { toast } from "react-toastify";

export default function AssessmentPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [assessmentStatus, setAssessmentStatus] = useState<IResponse | null>(
    null
  );
  const { enrollments } = useAppSelector((state) => state.enrollments);
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState<IAssessment>({
    minimumMark: null,
    questions: [],
  });

  useEffect(() => {
    if (!enrollments.find((course) => course.courseId === id)) {
      navigate("/student");
    }
  }, [id, navigate, enrollments]);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const { data } = await api.get(`/assessment/${id}`);
        setAssessment(data.assessment);
        setLoading(false);
      } catch (err) {
        toast.error("Error")
        setLoading(false);
      }
    })();
  }, [id]);

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const handleAnswerSelect = (
    questionId: number,
    selectedAnswer: string
  ): void => {
    // Check if the answer for this question is already selected
    const existingAnswerIndex = selectedAnswers.findIndex(
      (answer) => answer.id === questionId
    );

    if (existingAnswerIndex !== -1) {
      // If answer already exists, update it
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[existingAnswerIndex] = {
        id: questionId,
        answer: selectedAnswer,
      };
      setSelectedAnswers(updatedAnswers);
    } else {
      // If answer doesn't exist, add it to the array
      setSelectedAnswers((prevAnswers) => [
        ...prevAnswers,
        { id: questionId, answer: selectedAnswer },
      ]);
    }
  };

  useEffect(() => {
    (async function () {
      if (submit) {
        if (selectedAnswers.length !== assessment.questions.length) {
          Swal.fire({
            icon: "warning",
            title: "Answer All questions",
          }).then(() => setSubmit(false));
          return;
        }
        try {
          setLoading2(true);
          const { data } = await api.post("/assessment/verify", {
            assessmentId: assessment._id,
            studentAnswers: selectedAnswers,
          });
          if (data.success) {
            setAssessmentStatus(data);
            setSubmit(false);
            setOpenModal(true);
            setLoading2(false);
          } else {
            setAssessmentStatus(data);
            setSubmit(false);
            setLoading2(false);
            setOpenModal(true);
          }
        } catch (_err) {
          toast.error("Error")
          setLoading2(false);
        }
      }
    })();
  }, [submit, selectedAnswers, assessment]);

  return (
    <>
      <AssessmentSucceess
        id={id}
        AssessmentStatus={assessmentStatus}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <StudentNav />
      <div className="bg-my-bg-dark md:px-40 pb-10 px-5 min-h-screen text-gray-200">
        {loading && (
          <div className="items-center justify-center flex w-full min-h-screen">
            <Loader />
          </div>
        )}
        {assessment.questions.length > 0 && !loading && (
          <>
            <div className="w-full flex pt-10 justify-center"></div>
            {assessment.questions.map((question) => (
              <div
                key={question.id}
                className="bg-mycard-body p-4 rounded-md mb-2"
              >
                <div className="flex w-full justify-between">
                  <h2 className="font-bold max-w-[80%] ">
                    {question.question}
                  </h2>
                  <h2 className="text-gray-400"> score: {question.mark}</h2>
                </div>
                <form className="flex ps-5 gap-10">
                  <div className="flex flex-col gap-2">
                    <label>
                      <input
                        className="w-4 h-4 cursor-pointer text-my-ring bg-transparent focus:ring-mytext-my-ring ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                        type="radio"
                        name={`question_${question.id}`}
                        value={question.optionA}
                        onChange={() =>
                          handleAnswerSelect(
                            question.id as unknown as number,
                            question.optionA
                          )
                        }
                      />
                      <span className="ms-2 cursor-pointer">
                        {question.optionA}
                      </span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        className="w-4 h-4 cursor-pointer text-my-ring bg-transparent focus:ring-mytext-my-ring ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                        value={question.optionB}
                        onChange={() =>
                          handleAnswerSelect(
                            question.id as unknown as number,
                            question.optionB
                          )
                        }
                      />
                      <span className="ms-2 cursor-pointer">
                        {question.optionB}
                      </span>
                    </label>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        className="w-4 h-4 cursor-pointer text-my-ring bg-transparent focus:ring-mytext-my-ring ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                        value={question.optionC}
                        onChange={() =>
                          handleAnswerSelect(
                            question.id as unknown as number,
                            question.optionC
                          )
                        }
                      />
                      <span className="ms-2 cursor-pointer">
                        {question.optionC}
                      </span>
                    </label>
                    <label>
                      <input
                        className="w-4 h-4 cursor-pointer text-my-ring bg-transparent focus:ring-mytext-my-ring ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                        type="radio"
                        name={`question_${question.id}`}
                        value={question.optionD}
                        onChange={() =>
                          handleAnswerSelect(
                            question.id as unknown as number,
                            question.optionC
                          )
                        }
                      />
                      <span className="ms-2 cursor-pointer">
                        {question.optionD}
                      </span>
                    </label>
                  </div>
                </form>
              </div>
            ))}

            {!loading2 ? (
              <button
                className="w-full rounded-lg h-10 mt-2 bg-primary"
                onClick={() => setSubmit(true)}
              >
                Submit Answers
              </button>
            ) : (
              <div className="w-full rounded-lg h-10 mt-2 bg-primary flex justify-center items-center">
                <Loader3 />
              </div>
            )}
          </>
        )}

        {assessment.questions.length <= 0 && !loading && (
          <div className="items-center justify-center flex w-full min-h-screen">
            <div className="flex flex-col items-center">
              <h1 className="text-5xl">OOPS!</h1>
              <h1>Tutor not added assessment for this course</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

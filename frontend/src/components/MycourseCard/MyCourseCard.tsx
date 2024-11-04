import { useNavigate } from "react-router-dom";
import { ICourse, ILesson } from "../../types/courseType";
import { Progress } from "flowbite-react";

interface prop extends ICourse {
  lessons: ILesson[] | undefined;
  completed?: string[];
}
export default function MyCouresCard({
  coverIMG,
  description,
  price,
  title,
  language,
  _id,
  lessons,
  completed,
}: prop) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-60">
        <div className="flex flex-col bg-mycard-body hover:scale-105 duration-300 hover:shadow-lg w-60 h-fit rounded-2xl">
          <img
            src={coverIMG}
            alt=""
            className="rounded-2xl h-32 object-cover overflow-hidden hover:border-b-4 border-my-ring"
          />
          <div className="leading-none mx-3 h-40">
            <h1 className="font-bold text-white text-2xl">{title}</h1>
            <div className="flex mt-2 justify-between w-full">
              <span className="text-green-500 font-bold"> ₹{price}</span>
              <small className="text-gray-300"> {language}</small>
            </div>
            <Progress
              progress={
                completed
                  ? Math.floor(
                      (completed?.length / (lessons as ILesson[]).length) * 100
                    )
                  : 0
              }
              progressLabelPosition="inside"
              textLabelPosition="outside"
              size="lg"
              labelProgress
              className="my-2"
              color="teal"
            />
            <div className="h-16">
              <small className="text-gray-300">
                {(description as string).slice(0, 60)}...
              </small>
            </div>
          </div>
          <button
            onClick={() => navigate(`/student/my-course/${_id}`)}
            className="font-bold text-white w-full bg-primary hover:bg-my-ring py-2 rounded-b-2xl"
          >
            Watch Now
          </button>
        </div>
      </div>
    </>
  );
}

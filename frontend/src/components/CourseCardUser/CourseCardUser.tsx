import Rating from "@mui/material/Rating";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ICouresUser } from "../../types/courseType";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface prop extends ICouresUser {}

export default function CoruseCardUser({ course, averageRating, _id }: prop) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-60">
        <div className="flex flex-col bg-mycard-body hover:scale-105 duration-300 hover:shadow-lg w-60 h-fit rounded-2xl">
          <img
            src={course.coverIMG}
            alt=""
            className="rounded-2xl h-32 object-cover overflow-hidden hover:border-b-4 border-my-ring"
          />
          <div className="leading-none mx-3 h-40">
            <h1 className="font-bold text-white text-2xl">{course.title}</h1>
            <div className="flex mt-2 items-center justify-between w-full">
              <span className="text-green-500 font-bold"> ₹{course.price}</span>
              <small className="text-gray-300"> {course.language}</small>
            </div>
            <small className="text-white leading-non">
              <ThemeProvider theme={darkTheme}>
                <Rating
                  name="read-only"
                  className="mt-3"
                  value={averageRating}
                  size="small"
                  readOnly
                />
              </ThemeProvider>
            </small>
            <div className="h-16">
              <small className="text-gray-300">
                {(course.description as string).slice(0, 60)}...
              </small>
            </div>
          </div>
          <button
            onClick={() => navigate(`/courses/${_id}`)}
            className="font-bold text-white w-full bg-primary hover:bg-my-ring py-2 rounded-b-2xl"
          >
            view
          </button>
        </div>
      </div>
    </>
  );
}

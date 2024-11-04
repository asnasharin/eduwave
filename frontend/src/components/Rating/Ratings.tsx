import Rating from "@mui/material/Rating";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAppSelector } from "../../app/store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Ratings() {
  const { course, isLoading } = useAppSelector((state) => state.courseDetail);
  return (
    <>
      <div className="w-full flex py-4 flex-col items-center min-h-14 bg-my-bg-dark/[0.3] mt-6">
        <h1 className="font-bold text-xl">RATINGS</h1>

        <div className="md:w-[80%] w-[90%] flex gap-10 py-10 justify-center overflow-x-auto">
          {isLoading ? (
            <></>
          ) : (
            <>
              {course?.ratings.map((e) => (
                <div className="bg-mycard-body md:p-5 rounded-md object-cover flex gap-3 shrink-0 w-96 h-fit">
                  <img
                    src={
                      e.student.profile
                        ? e.student.profile
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    }
                    alt=""
                    className="w-28 object-cover rounded-md"
                  />
                  <div>
                    <ThemeProvider theme={darkTheme}>
                      <Rating
                        name="read-only"
                        className="mt-3"
                        value={e.rating}
                        size="small"
                        readOnly
                      />
                    </ThemeProvider>
                    <h1 className="font-bold">{e.student.name}</h1>
                    <small>{e.review}</small>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

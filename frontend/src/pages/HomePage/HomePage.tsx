import StudentNav from "../../components/NavBar/StudentNav";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CouresCardSkeleton from "../../components/skeletons/courseCardSkeletons";
// import Footer from "../../components/Footer/Footer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function HomPage() {
  return (
    <>
      {/* <ShowCertificateModal /> */}
      <StudentNav />
      <div className="w-full flex flex-col items-center min-h-[100vh] bg-[#1e101c]">
        <form
          className="w-full flex px-10 backdrop-blur-xl justify-center py-36 bg-[url('https://static.vecteezy.com/system/resources/previews/016/341/324/original/deep-dark-violet-neon-lights-watercolor-on-black-background-dark-purple-grungy-background-dark-purple-marble-texture-background-old-purple-paper-background-purple-stained-grungy-background-free-vector.jpg')] bg-no-repeat "
        >
          <div className="text-white shadow-2xl bg-[#2e1422] ring-[#662080] ring-1 flex w-96 items-center justify-between rounded-full">
            <input
              type="text"
              placeholder="find courses"
              className="rounded-s-full bg-[#1b0a1b] border-0 w-[90%] bg-transparent"
            />
            <button>
              <SearchIcon className="me-2 " />
            </button>
          </div>
        </form>
        <h1 className="text-3xl font-bold text-gray-100 mt-4">
          POPULAR COURSES
        </h1>
        <div className="flex flex-col items-center">
          <ThemeProvider theme={darkTheme}>
            <Skeleton width={1100} height={400} />
            <Skeleton width={400} height={50} />
          </ThemeProvider>
        </div>
        <div className="flex md:p-10 gap-6 p-3 items-center justify-center w-full flex-wrap">
          <CouresCardSkeleton />
          <CouresCardSkeleton />
          <CouresCardSkeleton />
          <CouresCardSkeleton />
          <CouresCardSkeleton />
          <CouresCardSkeleton />
          <CouresCardSkeleton />
          <CouresCardSkeleton />
        </div>
      </div>
      <div className="w-full flex flex-col text-center text-gray-200 items-center py-10 bg-[#301339]">
        <h1 className="text-5xl font-bold">Have Certificate?</h1>
        <h1 className="text-3xl">verify now</h1>
        <form className="w-full flex px-10 backdrop-blur-xl justify-center">
          <div className="text-white shadow-2xl bg-[#2e1422] ring-[#662080] my-4 ring-1 flex w-96 items-center justify-between rounded-full">
            <input
              type="text"
              placeholder="Enter certificate ID eg:CERT6799367494"
              className="rounded-s-full px-5 bg-[#1b0a1b] border-0 w-[90%] bg-transparent"
            />
            <button>
              <SearchIcon className="me-2 " />
            </button>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
}

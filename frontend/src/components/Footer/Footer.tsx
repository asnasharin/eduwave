import { Link } from "react-router-dom";
import Logo from "../../assets/react.svg";

export default function Footer() {
  return (
    <>
      <footer
        className="wow fadeInUp p-10 relative z-0 bg-[#090E34] pt-5 lg:pt-[60px]"
        data-wow-delay=".15s"
      >
        <div className="container">
          <div className="mb-10 w-full items-center justify-center flex flex-col">
            <h1 className="mb-6 inline-block max-w-[160px]">
              <img src={Logo} alt="logo" width={1000} className="max-w-full" />
            </h1>
            <h1 className="mb-8 max-w-[400px] text-gray-200 text-center">
              "Creating a world where learning is accessible to everyone,
              everywhere."
            </h1>
          </div>
        </div>

        <div className="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 md:w-2/3 lg:w-1/2">
                <div className="my-1">
                  <div className="-mx-3 flex items-center justify-center md:justify-start">
                    <Link
                      to={
                        "https://github.com/SHUHAIB-T/TutorNest-MERN/blob/main/LICENSE"
                      }
                      className="px-3 text-gray-200  hover:text-white hover:underline"
                    >
                      LICENCE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

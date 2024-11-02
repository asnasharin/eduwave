import { Dropdown, Navbar } from "flowbite-react";
import { customTheme } from "../util/navCustomTheme";
import { Flowbite } from "flowbite-react";
import Logo from "../../assets/react.svg";
import { Link } from "react-router-dom";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Tooltip } from "flowbite-react";

export default function StudentNav() {
  

  return (
    <>
      <div className="sticky top-0 z-10">
        <Flowbite theme={{ theme: customTheme }}>
          <Navbar>
            <Navbar.Brand>
              <Link to={"/"}>
                <img src={Logo} className="mr-3 h-6 sm:h-9" />
              </Link>
            </Navbar.Brand>
            <div className="flex items-center md:order-2">
              {/* {user && ( */}
                <Link to={"/student/chat"}>
                  <Tooltip content="messages" style="dark">
                    <InsertCommentIcon className="text-white me-3" />
                  </Tooltip>
                </Link>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      className="w-10 rounded-full border-2 border-violet-700"
                    />
                }
              >
                <>
                    <>
                      <Dropdown.Header>
                        <span className="font-bold">profilename</span>
                        <span className="block truncate text-sm font-medium">
                          user email
                        </span>
                      </Dropdown.Header>
                      <Link to={"/student/profile"}>
                        <Dropdown.Item>My Profile</Dropdown.Item>
                      </Link>
                      <Link to={"/student/posts"}>
                        <Dropdown.Item>My Posts</Dropdown.Item>
                      </Link>
                      <Link to={"/student/my-course"}>
                        <Dropdown.Item>My Courses</Dropdown.Item>
                      </Link>
                      <Dropdown.Divider />

                      <Dropdown.Item >
                        Sign out
                      </Dropdown.Item>
                    </>
                    <>
                      <div className="sticky top-0 z-10">
                        <Link to={"/login"}>
                          <Dropdown.Item>LOGIN</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Link to={"/tutor/signup"}>
                          <Dropdown.Item>SIGNUP As Tutor</Dropdown.Item>
                        </Link>
                        <Link to={"/student/signup"}>
                          <Dropdown.Item>SIGNUP As Student</Dropdown.Item>
                        </Link>
                      </div>
                    </>
                </>
              </Dropdown>
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
              <Link to={"/student"}>
                <Navbar.Link
                  active={
                    location.pathname === "/student" ||
                    location.pathname === "/"
                  }
                >
                  Home
                </Navbar.Link>
              </Link>
              <Link to={"/courses"}>
                <Navbar.Link active={location.pathname.includes("/courses")}>
                  Courses
                </Navbar.Link>
              </Link>
              <Link to={"/tutors"}>
                <Navbar.Link active={location.pathname.includes("/tutors")}>
                  Tutors
                </Navbar.Link>
              </Link>
            </Navbar.Collapse>
          </Navbar>
        </Flowbite>
      </div>
    </>
  );
}

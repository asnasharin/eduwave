import { Dropdown, Navbar } from "flowbite-react";
import { useAppDispatch } from "../../app/store";
import { customTheme } from "../util/navCustomTheme";
import { Flowbite } from "flowbite-react";
import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Tooltip } from "flowbite-react";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { useState } from "react";
import ConnectionsDrawer from "../ConnectionsDrawer/ConnectionDrawer";

export default function NavBar({ role }: { role: string }) {
  const profile = JSON.parse(localStorage.getItem("profile") as string);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const drop = () => {
    if (role === "TUTOR" || role === "ADMIN") {
      return (
        <>
          <div className="sticky top-0 z-10">
            <Dropdown.Item onClick={() => dispatch(logout())}>
              LOGOUT
            </Dropdown.Item>
          </div>
        </>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <>
      <ConnectionsDrawer open={open} setOpen={setOpen} />
      <div className="sticky top-0 z-10">
        <Flowbite theme={{ theme: customTheme }}>
          <Navbar>
            <Link to={"/"}>
              <Navbar.Brand>
                <img src={Logo} className="mr-3 h-6 sm:h-9" />
              </Navbar.Brand>
            </Link>
            <div className="flex md:order-2 items-center gap-4">
              {role === "TUTOR" && (
                <Tooltip style="dark" content="messages">
                  <Link to={"/tutor/chat"}>
                    <InsertCommentIcon className="text-white" />
                  </Link>
                </Tooltip>
              )}
              {role === "TUTOR" && (
                <Tooltip style="dark" content="requests">
                  <button onClick={() => setOpen(!open)}>
                    <ConnectWithoutContactIcon className="text-white" />
                  </button>
                </Tooltip>
              )}
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  profile?.profile ? (
                    <img
                      alt="User settings"
                      src={profile.profile}
                      className="w-10 rounded-full border-2 border-violet-700"
                    />
                  ) : (
                    <img
                      alt="User settings"
                      src="https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png"
                      className="w-10 rounded-full border-2 border-violet-700"
                    />
                  )
                }
              >
                {drop()}
              </Dropdown>
            </div>
          </Navbar>
        </Flowbite>
      </div>
    </>
  );
}

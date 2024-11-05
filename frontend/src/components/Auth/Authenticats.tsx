import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Authenticate() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user as string);
  useEffect(() => {
    if (parseUser?.role === "STUDENT") {
      navigate("/student");
    } else if (parseUser?.role === "TUTOR") {
      navigate("/tutor");
    } else if (parseUser?.role === "ADMIN") {
      navigate("/admin");
    }
  }, [parseUser, navigate]);
  return <>{!user ? <Outlet /> : null}</>;
}

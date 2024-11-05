import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Cookies from "js-cookie";

type prop = {
  role: string;
};

export default function Protect({ role }: prop) {
  const { user } = useAppSelector((state) => state.auth);
  const token = Cookies.get("token");
  const isAuth = token && user && user.role === role;

  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
}

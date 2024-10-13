import Login from "../../components/Login/Login";

export default function LoginPage({ role }: { role: string }) {
  return (
    <>
      <Login role={role} />
    </>
  );
}

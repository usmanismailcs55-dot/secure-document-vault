import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { token } = useAuth();

  return (
    <div>
      <h1>Login</h1>
      <p>Token: {token ? "Available" : "Not available"}</p>
    </div>
  );
}

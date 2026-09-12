import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <div>
      <h1>Secure Document Vault</h1>

      <p>
        {token ? "You are logged in" : "You are not logged in"}
      </p>
    </div>
  );
}

export default App;

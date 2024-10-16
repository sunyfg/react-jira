import UnauthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./authenticated-app";
import { useAuth } from "./context/auth-context";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="app">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;

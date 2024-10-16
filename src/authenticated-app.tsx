import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./pages/project-list/index";

export default function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
}

import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./pages/project-list/index";

export default function AuthenticatedApp() {
  const { logout, user } = useAuth();
  return (
    <div>
      {user && (
        <div>
          <p>当前登录用户:{user.name} </p>
        </div>
      )}
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
}
